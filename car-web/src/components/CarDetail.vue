<template>
    <div class="car-detail">
        <div class="main-title-container">
            <div class="first-title">
                {{ carInfo.dealer.dealerName }} /
            </div>
            <div class="second-title">
                {{ carInfo.saleTitle }}
            </div>
        </div>
        <!-- 第一行：图片和信息 -->
        <div class="row mb-4">
            <!-- 左侧图片轮播 -->
            <div class="col-md-6">
                <div class="main-image mb-3">
                    <swiper ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="(media, index) in allSwaggerImages" :key="index">
                            <div v-if="media.type === 'youtube'" class="video-container">
                                <iframe width="100%" height="100%" :src="convertToEmbedUrl(media.url)" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen>
                                </iframe>
                            </div>
                            <video v-else-if="media.type === 'video'" controls width="100%">
                                <source :src="media.url" type="video/mp4">
                            </video>
                            <img v-else :src="media.url" class="img-fluid rounded" alt="汽车图片"
                                @click="showLightbox(index)">
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
                <div class="thumbnail-container">
                    <img v-for="(media, index) in allSwaggerImages" :key="index" :src="getThumbnailSrc(media)"
                        class="thumbnail" :class="{ active: currentMediaIndex === index }" @click="changeMedia(index)">
                </div>
                <!-- Line分享按钮 -->
                <div class="share-container">
                    <div class="line-it-button" data-lang="zh_Hant" data-type="share-a" data-env="REAL"
                        :data-url="'https://sale.carce.cc/car/preview/'+carId" data-color="default" data-size="large"
                        data-count="false" data-ver="3" style="display: none;"></div>
                </div>
            </div>

            <!-- 右侧信息 -->
            <div class="col-md-6">
                <h2 class="car-title">{{ carInfo.title }}</h2>
                <div class="price mb-3">
                    <span class="h4">${{ carInfo.price }}</span>
                </div>
                <div class="specs mb-3">
                    <div class="row">
                        <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="(spec, index) in carInfo.specs"
                            :key="index">
                            <div class="spec-name text-muted">{{ spec.name }}</div>
                            <div class="spec-value">{{ spec.value }}</div>
                        </div>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-phone" @click="callPhone" @mouseenter="phoneButtonHover = true"
                        @mouseleave="phoneButtonHover = false">
                        <i class="bi bi-telephone"></i> {{ phoneButtonHover ? carInfo.dealer.companyPhone || '暂无电话' :
                        '撥打電話' }}
                    </button>
                    <button class="btn btn-line" @click="contactLine" @mouseenter="lineButtonHover = true"
                        @mouseleave="lineButtonHover = false">
                        <i class="bi bi-chat-dots"></i> {{ lineButtonHover ? carInfo.dealer.lineId || '暂无Line ID' :
                        'LINE' }}
                    </button>
                </div>
                <div class="dealer-info mt-3 text-left">
                    <div class="dealer-contact">聯絡人： {{ carInfo.dealer.contactPerson || '--' }}</div>
                    <div class="dealer-address">
                        賞車地址： {{ carInfo.dealer.publicAddress }}
                        📍<a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(carInfo.publicAddress)"
                            target="_blank">查看地圖</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 第三行：Tab页 -->
        <div class="tabs">
            <ul class="nav nav-tabs">
                <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                    <a class="nav-link" :class="{ active: activeTab === tab }" @click="activeTab = tab">
                        {{ tab.title }}
                    </a>
                </li>
            </ul>
            <div class="tab-content p-3 border border-top-0 rounded-bottom">
                <div v-show="activeTab.code === 'car_equipments'">
                    <div class="equipment-header">
                        車輛配備
                    </div>
                    <div class="equipment-section" v-for="(equipment, index) in carEquipments" :key="index">
                        <div class="equipment-row d-flex flex-column flex-md-row"> <!-- 修改此处：默认垂直排列，中等屏幕及以上水平排列 -->
                            <div class="equipment-name">{{ equipment.name }}</div>
                            <div class="equipment-tags">
                                <span class="equipment-tag" v-for="(tag, tagIndex) in equipment.tags" :key="tagIndex">
                                    <i class="iconfont">&#xe632;</i> {{ tag }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-header">
                        賣家保證
                    </div>
                    <div class="guarantee-tags">
                        <div class="guarantee-section" v-for="(gur, index) in carGuarantees" :key="index">
                            <div class="guarantee-name"><i class="iconfont">&#xe632;</i>{{ gur.itemName }}</div>
                            <div class="guarantee-desc">
                                {{ gur.description }}
                            </div>
                        </div>
                    </div>
                    <div class="equipment-header">
                        車輛描述
                    </div>
                    <iframe ref="contentFrame" class="content-frame" :srcdoc="getHtmlContent(carInfo.saleDescription)"
                        frameborder="0" width="100%"></iframe>
                    <div style="height: 1em;"></div>
                </div>
                <div v-show="activeTab.code === 'dealer_intro'">
                    <div class="dealer-container">
                        <div class="dealer-intro">
                            <div class="dealer-intro-row">
                                <div class="dealer-title">店家名稱</div>
                                <div class="dealer-content">{{ carInfo.dealer.dealerName || '--' }}</div>
                            </div>
                            <div class="dealer-intro-row">
                                <div class="dealer-title">店家地址</div>
                                <div class="dealer-content">{{ carInfo.dealer.publicAddress || '--' }}</div>
                            </div>
                            <div class="dealer-intro-row">
                                <div class="dealer-title">聯絡人</div>
                                <div class="dealer-content">{{ carInfo.dealer.contactPerson || '--' }}</div>
                            </div>
                            <div class="dealer-intro-row">
                                <div class="dealer-title">店家電話</div>
                                <div class="dealer-content">{{ carInfo.dealer.companyPhone || '--' }}</div>
                            </div>
                            <div class="dealer-intro-row">
                                <div class="dealer-title">手機</div>
                                <div class="dealer-content">{{ carInfo.dealer.companyMobile || '--' }}</div>
                            </div>
                            <div class="dealer-intro-row">
                                <div class="dealer-title">LINE</div>
                                <div class="dealer-content">
                                    <button class="btn-line-id" @click="contactLine" @mouseenter="lineIdHover = true"
                                        @mouseleave="lineIdHover = false" v-if="carInfo.dealer.lineId">
                                        <i class="bi bi-chat-dots"></i> {{ lineIdHover ? carInfo.dealer.lineId :
                                        'LINE聯絡我' }}
                                    </button>
                                    <span v-else>--</span>
                                </div>
                            </div>
                            <div class="dealer-intro-row">
                                <div class="dealer-title">網址</div>
                                <div class="dealer-content">{{ carInfo.dealer.website || '--' }}</div>
                            </div>
                        </div>
                        <div class="dealer-cover">
                            <img :src="carInfo.dealer.coverImage" alt="店家封面">
                        </div>
                    </div>
                    <iframe ref="dealerContentFrame" class="content-frame"
                        :srcdoc="getHtmlContent(carInfo.dealer.description)" frameborder="0" width="100%"></iframe>
                </div>
            </div>
        </div>

        <!-- 添加图片查看器组件 -->
        <vue-easy-lightbox :visible="visibleLightbox" :imgs="lightboxImages" :index="lightboxIndex"
            @hide="visibleLightbox = false"></vue-easy-lightbox>
    </div>
</template>

<script>
import CarDetailScript from './CarDetail.js';
export default CarDetailScript;
</script>

<style lang="less" src="./CarDetail.less" scoped></style>
