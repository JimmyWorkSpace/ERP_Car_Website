<template>
    <div class="car-detail">
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
                            <img v-else :src="media.url" class="img-fluid rounded" alt="汽车图片" @click="showLightbox(index)">
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
            </div>

            <!-- 右侧信息 -->
            <div class="col-md-6">
                <h2 class="car-title">{{ carInfo.title }}</h2>
                <div class="price mb-3">
                    <span class="text-danger h4">¥{{ carInfo.price }}</span>
                </div>
                <div class="specs mb-3">
                    <div class="row">
                        <div class="col-3  mb-3" v-for="(spec, index) in carInfo.specs" :key="index">
                            <div class="spec-name text-muted">{{ spec.name }}</div>
                            <div class="spec-value">{{ spec.value }}</div>
                        </div>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" @click="callPhone">
                        <i class="bi bi-telephone"></i> 拨打电话: {{ carInfo.baseInfo.dealer.phone }}
                    </button>
                    <button class="btn btn-success" @click="contactLine">
                        <i class="bi bi-chat-dots"></i> Line联系: {{ carInfo.baseInfo.dealer.line }}
                    </button>
                </div>
                <div class="dealer-info mt-3 text-left">
                    <div class="dealer-contact">聯絡人： {{ carInfo.baseInfo.dealer.contact_person }}</div>
                    <div class="dealer-address">
                        賞車地址： {{ carInfo.baseInfo.dealer.address }}
                        📍<a :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(carInfo.baseInfo.dealer.address)"
                            target="_blank">查看地圖</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 第二行：标签信息 -->
        <div class="tags mb-4">
            <span class="badge bg-secondary me-2" v-for="(tag, index) in carInfo.tags.tags" :key="index">
                {{ tag }}
            </span>
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
                    <div class="equipment-tags">
                        <span class="equipment-tag" v-for="(tag, tagIndex) in sellerGuarantee" :key="tagIndex">
                            <i class="iconfont">&#xe632;</i>{{ tag }}
                        </span>
                    </div>
                    <div style="height: 1em;"></div>
                    <div class="equipment-header">
                        車輛特色
                    </div>
                    <div class="equipment-tags">
                        <span class="equipment-tag" v-for="(tag, tagIndex) in vehicleFeatures" :key="tagIndex">
                            <i class="iconfont">&#xe632;</i> {{ tag }}
                        </span>
                    </div>
                </div>
                <div v-show="activeTab.code === 'car_desc'">
                    <div v-html="carDesc"></div>
                </div>
                <div v-show="activeTab.code === 'dealer_intro'">
                    <div class="dealer-intro">
                        <div class="dealer-name">{{ carInfo.baseInfo.dealer.name }}</div>
                        <div class="dealer-address">{{ carInfo.baseInfo.dealer.address }}</div>
                        <div class="dealer-contact">聯絡人： {{ carInfo.baseInfo.dealer.contact_person }}</div>
                        <div class="dealer-phone">電話： {{ carInfo.baseInfo.dealer.phone }}</div>
                        <div class="dealer-line">Line： {{ carInfo.baseInfo.dealer.line }}</div>
                    </div>

                </div>
            </div>
        </div>

        <!-- 添加图片查看器组件 -->
        <vue-easy-lightbox
            :visible="visibleLightbox"
            :imgs="lightboxImages"
            :index="lightboxIndex"
            @hide="visibleLightbox = false"
        ></vue-easy-lightbox>
    </div>
</template>

<script>
import CarDetailScript from './CarDetail.js';
export default CarDetailScript;
</script>

<style lang="less" src="./CarDetail.less" scoped></style>
