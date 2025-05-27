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
          <client-only>
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="(media, index) in allSwaggerImages" :key="index">
                <div v-if="media.type === 'youtube'" class="video-container">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    :src="convertToEmbedUrl(media.url)" 
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                  </iframe>
                </div>
                <video v-else-if="media.type === 'video'" controls width="100%">
                  <source :src="media.url" type="video/mp4">
                </video>
                <img 
                  v-else 
                  :src="media.url" 
                  class="img-fluid rounded" 
                  alt="汽车图片"
                  @click="showLightbox(index)">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </client-only>
        </div>
        <div class="thumbnail-container">
          <img 
            v-for="(media, index) in allSwaggerImages" 
            :key="index" 
            :src="getThumbnailSrc(media)"
            class="thumbnail" 
            :class="{ active: currentMediaIndex === index }" 
            @click="changeMedia(index)">
        </div>
        <!-- Line分享按钮 -->
        <div class="share-container mt-3">
          <button class="btn btn-share-line" @click="shareToLine">
            <i class="iconfont">&#xe6f3;</i> LINE 分享
          </button>
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
            <div 
              class="col-6 col-sm-6 col-md-4 col-lg-3 mb-3" 
              v-for="(spec, index) in carInfo.specs" 
              :key="index">
              <div class="spec-name text-muted">{{ spec.name }}</div>
              <div class="spec-value">{{ spec.value }}</div>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <button 
            class="btn btn-phone" 
            @click="callPhone" 
            @mouseenter="phoneButtonHover = true" 
            @mouseleave="phoneButtonHover = false">
            <i class="bi bi-telephone"></i> 
            {{ phoneButtonHover ? carInfo.dealer.companyPhone || '暂无电话' : '撥打電話' }}
          </button>
          <button 
            class="btn btn-line" 
            @click="contactLine" 
            @mouseenter="lineButtonHover = true" 
            @mouseleave="lineButtonHover = false">
            <i class="bi bi-chat-dots"></i> 
            {{ lineButtonHover ? carInfo.dealer.lineId || '暂无Line ID' : 'LINE' }}
          </button>
        </div>
        <div class="dealer-info mt-3 text-left">
          <div class="dealer-contact">聯絡人： {{ carInfo.dealer.contactPerson || '--' }}</div>
          <div class="dealer-address">
            賞車地址： {{ carInfo.dealer.publicAddress }}
            📍<a 
              :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(carInfo.publicAddress)"
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
            <div class="equipment-row d-flex flex-column flex-md-row">
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
          <iframe 
            ref="contentFrame" 
            class="content-frame" 
            :srcdoc="getHtmlContent(carInfo.saleDescription)" 
            frameborder="0" 
            width="100%">
          </iframe>
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
                  <button 
                    class="btn-line-id" 
                    @click="contactLine" 
                    @mouseenter="lineIdHover = true" 
                    @mouseleave="lineIdHover = false"
                    v-if="carInfo.dealer.lineId">
                    <i class="bi bi-chat-dots"></i> 
                    {{ lineIdHover ? carInfo.dealer.lineId : 'LINE聯絡我' }}
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
          <iframe 
            ref="dealerContentFrame" 
            class="content-frame" 
            :srcdoc="getHtmlContent(carInfo.dealer.description)" 
            frameborder="0" 
            width="100%">
          </iframe>
        </div>
      </div>
    </div>

    <!-- 添加图片查看器组件 -->
    <client-only>
      <vue-easy-lightbox 
        :visible="visibleLightbox" 
        :imgs="lightboxImages" 
        :index="lightboxIndex"
        @hide="visibleLightbox = false">
      </vue-easy-lightbox>
    </client-only>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'CarDetail',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      allSwaggerImages: [],
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: true,
        autoplay: false
      },
      phoneButtonHover: false,
      lineButtonHover: false,
      lineIdHover: false,
      currentMediaIndex: 0,
      activeTab: {},
      showVideo: false,
      carImages: [],
      carVideo: [],
      carInfo: {
        dealer: {},
        specs: [],
        title: '',
        price: '',
        saleTitle: '',
        saleDescription: '',
        publicAddress: ''
      },
      carEquipments: [],
      carGuarantees: [],
      tabs: [
        { title: '車輛配備', code: 'car_equipments' },
        { title: '車商介紹', code: 'dealer_intro' },
      ],
      visibleLightbox: false,
      lightboxIndex: 0,
    }
  },
  computed: {
    currentImage() {
      return this.allSwaggerImages[this.currentMediaIndex]
    },
    lightboxImages() {
      return this.allSwaggerImages
        .filter(media => media.type === 'image')
        .map(media => media.url);
    }
  },
  async asyncData({ params, $axios, error }) {
    try {
      const carId = params.id
      
      // 模拟数据 - 在实际项目中应该从API获取
      const mockData = {
        carInfo: {
          title: `汽車 ${carId}`,
          price: '250000',
          saleTitle: '精品車輛，車況極佳',
          saleDescription: '<p>這是一輛精心保養的車輛，內外兼修，性能優異。</p>',
          publicAddress: '台北市信義區信義路五段7號',
          specs: [
            { name: '年份', value: '2020' },
            { name: '里程', value: '3萬公里' },
            { name: '排氣量', value: '2.0L' },
            { name: '變速箱', value: '自排' },
            { name: '顏色', value: '白色' },
            { name: '座位', value: '5人座' }
          ],
          dealer: {
            dealerName: '優質車行',
            contactPerson: '張經理',
            companyPhone: '02-1234-5678',
            companyMobile: '0912-345-678',
            lineId: 'cardealer123',
            website: 'https://www.example.com',
            publicAddress: '台北市信義區信義路五段7號',
            coverImage: 'https://via.placeholder.com/400x300?text=車行封面',
            description: '<p>我們是專業的汽車經銷商，提供優質的車輛和完善的售後服務。</p>'
          }
        },
        carEquipments: [
          {
            name: '安全配備',
            tags: ['ABS防鎖死煞車', '雙前座氣囊', '側邊氣囊', '電子穩定系統']
          },
          {
            name: '舒適配備',
            tags: ['真皮座椅', '電動座椅', '恆溫空調', '電動窗']
          }
        ],
        carGuarantees: [
          {
            itemName: '引擎保固',
            description: '提供一年引擎保固服務'
          },
          {
            itemName: '售後服務',
            description: '專業技師提供完整的售後維修服務'
          }
        ],
        carImages: [
          'https://via.placeholder.com/800x600?text=汽車圖片1',
          'https://via.placeholder.com/800x600?text=汽車圖片2',
          'https://via.placeholder.com/800x600?text=汽車圖片3'
        ],
        carVideo: []
      }

      // 处理媒体数据
      let allSwaggerImages = []
      if (mockData.carVideo && mockData.carVideo.length > 0) {
        allSwaggerImages.push({
          url: mockData.carVideo[0],
          type: isYoutubeVideo(mockData.carVideo[0]) ? 'youtube' : 'video'
        })
      }
      allSwaggerImages = allSwaggerImages.concat(mockData.carImages.map(img => ({
        url: img,
        type: 'image'
      })))

      return {
        ...mockData,
        allSwaggerImages
      }
    } catch (err) {
      error({ statusCode: 404, message: '汽车信息未找到' })
    }

    // 辅助函数
    function isYoutubeVideo(url) {
      return url && (url.includes('youtube.com') || url.includes('youtu.be'))
    }
  },
  mounted() {
    if (process.client) {
      this.activeTab = this.tabs[0]
      this.initSwiper()
      this.setupContentFrames()
      window.addEventListener('message', this.handleIframeMessage)
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('message', this.handleIframeMessage)
    }
  },
  methods: {
    initSwiper() {
      this.$nextTick(() => {
        if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
          const swiper = this.$refs.mySwiper.swiper
          swiper.on('slideChange', () => {
            this.currentMediaIndex = swiper.realIndex
          })
        }
      })
    },
    setupContentFrames() {
      this.$nextTick(() => {
        const contentFrames = document.querySelectorAll('iframe.content-frame')
        contentFrames.forEach(frame => {
          frame.onload = () => {
            try {
              frame.style.height = (frame.contentWindow.document.body.scrollHeight + 50) + 'px'
            } catch (e) {
              console.error('调整iframe高度失败', e)
            }
          }
        })
      })
    },
    handleIframeMessage(event) {
      if (event.data && (event.data.type === 'iframe-loaded' || event.data.type === 'iframe-resized')) {
        const iframes = document.querySelectorAll('iframe.content-frame')
        iframes.forEach(iframe => {
          try {
            if (iframe.contentWindow === event.source) {
              iframe.style.height = `${event.data.height}px`
            }
          } catch (e) {
            console.error('处理iframe消息出错', e)
          }
        })
      }
    },
    getHtmlContent(content) {
      if (!content) return '<html><body></body></html>'
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              margin: 0; 
              padding: 10px;
              color: #333;
            }
            img { max-width: 100%; height: auto; }
            a { color: #007bff; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>${content}</body>
        </html>
      `
    },
    changeMedia(index) {
      this.currentMediaIndex = index
      if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
        this.$refs.mySwiper.swiper.slideTo(index)
      }
    },
    getThumbnailSrc(media) {
      if (media.type === 'youtube') {
        return `https://img.youtube.com/vi/${this.getYoutubeVideoId(media.url)}/mqdefault.jpg`
      } else if (media.type === 'video') {
        return media.url
      } else {
        return media.url
      }
    },
    getYoutubeVideoId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return (match && match[2].length === 11) ? match[2] : null
    },
    callPhone() {
      if (this.carInfo.dealer.companyPhone) {
        window.open(`tel:${this.carInfo.dealer.companyPhone}`)
      }
    },
    contactLine() {
      if (this.carInfo.dealer.lineId) {
        window.open(`https://line.me/ti/p/${this.carInfo.dealer.lineId}`)
      }
    },
    shareToLine() {
      const url = window.location.href
      const text = `${this.carInfo.title} - ${this.carInfo.saleTitle}`
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
      window.open(lineUrl, '_blank')
    },
    isYoutubeVideo(url) {
      return url && (url.includes('youtube.com') || url.includes('youtu.be'))
    },
    convertToEmbedUrl(url) {
      if (this.isYoutubeVideo(url)) {
        const videoId = this.getYoutubeVideoId(url)
        return `https://www.youtube.com/embed/${videoId}`
      }
      return url
    },
    showLightbox(index) {
      this.lightboxIndex = this.getImageOnlyIndex(index)
      this.visibleLightbox = true
    },
    getImageOnlyIndex(mixedIndex) {
      let imageIndex = 0
      for (let i = 0; i < mixedIndex; i++) {
        if (this.allSwaggerImages[i].type === 'image') {
          imageIndex++
        }
      }
      return imageIndex
    }
  },
  head() {
    return {
      title: this.carInfo.title || '汽車詳情',
      meta: [
        { hid: 'description', name: 'description', content: this.carInfo.saleTitle || '汽車詳情頁面' },
        { hid: 'og:title', property: 'og:title', content: this.carInfo.title },
        { hid: 'og:description', property: 'og:description', content: this.carInfo.saleTitle },
        { hid: 'og:image', property: 'og:image', content: this.carImages[0] || '' }
      ]
    }
  }
}
</script> 