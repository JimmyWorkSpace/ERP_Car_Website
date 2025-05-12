import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import axios from 'axios'  // 新增：引入axios

export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
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
            currentMediaIndex: 0,
            activeTab: {},
            showVideo: false,
            carImages: {
                "car_id": 123,
                "images": [
                    "https://autoart.beplusthemes.com/wp-content/uploads/2024/04/img-gallery-car-003-min.jpg",
                    "https://autoart.beplusthemes.com/wp-content/uploads/2024/07/img-car-010-min.jpg",
                    "https://autoart.beplusthemes.com/wp-content/uploads/2024/04/img-gallery-car-002-min.jpg",
                    "https://autoart.beplusthemes.com/wp-content/uploads/2024/04/img-gallery-car-003-min.jpg",
                    "https://autoart.beplusthemes.com/wp-content/uploads/2024/07/img-car-010-min.jpg",
                    "https://autoart.beplusthemes.com/wp-content/uploads/2024/04/img-gallery-car-002-min.jpg"
                ]
            },
            carVideo: {
                "car_id": 123,
                "video_url": "https://www.youtube.com/watch?v=2keBrn-mWso"
            },
            carInfo: {
                title: '--',
                price: '--',
                baseInfo: {
                    "title": "TOYOTA COROLLA ALTIS",
                    "brand": "TOYOTA",
                    "model": "ALTIS",
                    "year": "2021-03",
                    "engine_cc": "1798cc",
                    "fuel_type": "油电混合",
                    "transmission": "CVT 自排",
                    "seats": 5,
                    "mileage": "34,000km",
                    "location": "新北市",
                    "color_exterior": "黑色",
                    "color_interior": "黑色",
                    "features": {
                        "safety": ["盲点侦测", "车道偏移警示", "HUD抬头显示器"],
                        "media": ["Apple CarPlay", "Harman/Kardon音响"]
                    },
                    "description": "车主自用车，全车原厂选配...",
                    "dealer": {
                        "name": "XX汽车",
                        "address": "新北市新庄区 XX路",
                        "contact_person": "王先生",
                        "phone": "0988-XXX-XXX",
                        "line": "@xxcars"
                    }
                },
                specs: [],
                tags: {
                    "car_id": 123,
                    "tags": ["TOYOTA", "油电混合", "小家庭", "五人座"]
                }
            },
            carEquipments: [],
            sellerGuarantee: ['新車保固中', '原版件', '證件齊全', '可無訂金試乘試駕', '三大保證'],
            vehicleFeatures: ['新車保固中', '原版件', '證件齊全', '可無訂金試乘試駕', '三大保證'],
            carDesc: '<section id="article" class="jsx-3371063651 article-content"><p><span>文：懂车帝原创 张晓丹</span></p><p><span>[懂车帝原创 产品] 日前，2025款马自达MX-5 Miata（北美地区命名方式）在北美市场上市，指导价29330-40650美元，折合人民币约21.3万-29.6万元。作为年度改款车型，2025款马自达MX-5 Miata继续提供软顶敞篷和硬顶敞篷车型可选，并同步新增35周年纪念版车型（售价暂未公布）。</span></p><div><img src="https://p3-dcd-sign.byteimg.com/tos-cn-i-axegupay5k/e45723fc4bce45fc9ee835223b9efc28~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=4h%2F6L7zw5rugvixi5XVz5IaBRcw%3D&amp;psm=motor.pc_common.api"><p>日本市场发布的马自达MX-5 Roadster 35周年纪念版实车</p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/a9d2bad50ea440bab6f1462d35986cb1~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=yD5p2CgZv9ZCO10CScW6zKKlWCY%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/35beb073cd8940f28c19d2e7472c3b33~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=GpLi62aEgNiBK0z3McwumFgNYA4%3D&amp;psm=motor.pc_common.api"><p>马自达MX-5 35周年纪念徽章</p></div><p><span>初代马自达MX-5（NA）于1989年推出，至今已35年，目前海外市场在售的马自达MX-5为第四代车型（ND）。马自达MX-5 35周年纪念版此前已于日本市场发布，该车最大的特色是使用"工匠红高级金属漆"，这款漆面基于马自达独有的涂装技术"匠涂"(TAKUMINURI)研发而来。据了解，北美市场销售的马自达MX-5 35周年纪念版将于2025年1月24日劳力士戴通纳24小时耐力赛（2025 Rolex 24 at DAYTONA）首发亮相。</span></p><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/2f2a59f60c6d4c5db0bab3cf0945b03f~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=N2IhCgw9rAS2DqPPgB3bHf852wg%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/07eeb3256b1543348d69aaa18da7b155~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=FqiznUPkKWSxqVBSWRXRcOP7ChI%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/72f82cb772ea47fb92a06b519972e636~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=t2VoFUvRxekcZckTiog4Zbim5VE%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/66ecefae75cb4549b6a3574e24265a18~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=Zqo3L2MZWCemXJUNe0C9LGOkj%2B8%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/d809f41e73d246fc8d5363b423b59404~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=3C8%2FfPHGl%2FgJmqUb51YrXvyWk2E%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/a4f882bb9c954619b13c455200da5c18~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=Ae7gnbux1dndY2%2B%2B06RjPFR9C9Y%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/66c2071e52fd46238bc7ae6357c40958~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=BTfZpFSFWGtU7QkDMGHZtgrRc2E%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/a9850636eba74c0f829482013d7ce64a~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=fgfWdXiMXOJVahI9OnyMbLFwOM4%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>马自达MX-5 Roadster 35周年纪念版外观造型变化不明显，仅在车身右侧增加35周年纪念版铭牌及序列号码，另外日本市场发布的实车有两种不同的轮辋样式选择。新车内饰和软顶敞篷织物表面采用棕褐色材质，与工匠红车身搭配较为协调。同时其运动座椅头枕处带有专属的35周年纪念徽章，车内地毯上也出现了35周年纪念版英文字样。</span></p><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/ffcd2c09ba5c4deba6081e5500419066~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=bWUZJfjQaJxDShjMTM0N17GzSf4%3D&amp;psm=motor.pc_common.api"><p>2025款马自达MX-5 Miata官图</p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/10c2e132a05b4af2af2ba9769e56d5c8~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=NPWnNsccWAgCy1wq2k4SeQwbPCg%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/52661deedd4d4c3283c69efc08b3ec08~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=8Q4GwGP%2B16xTfJakrBneSVwGImc%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/ad643d81ed474991bac68bb7e5720102~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=CTWpTteB2Fe8PxBJ0AREN8spZSI%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/740daf1ebee84c3ab4a977274ed45eef~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=6Cab9qp5c3RPsaJePtfgn%2BFbyDo%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/cd90789067f74effade04c917ebfdce4~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=7Vj0%2FY9DFCj%2BD%2FEAyGKehUp1Ix8%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>除35周年纪念版之外，2025款马自达MX-5 Miata有Sport版、Club版、Grand Touring版三个标准配置级别，以及航空灰、雪花白珠光漆、魂动红金属漆、机械灰金属漆等漆面选择。其中Sport版作为入门级车型，仅提供黑色织物软顶敞篷版本，标配8.8英寸信息娱乐显示屏，支持Apple CarPlay、Android Auto手机无线互联功能，内置亚马逊Alexa语音助手。</span></p><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/66d6674b7e7e4e5890cd3feefa1c3c65~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=yMnOiEpu8apNECwdcPI1%2FmlPlOU%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>Sport版的其他标配功能还包括三辐式真皮方向盘、真皮换挡旋钮及手刹、织物桶椅、六扬声器音响系统、无钥匙进入、16英寸铝合金轮辋等。另外新车配备的i-ACTIVSENSE马自达智能安全辅助系统具有带后方交叉交通警报的盲点监控、智能主动刹车、车道偏离预警等功能。</span></p><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/0e0f696b15024abab2d142fdd25cd017~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=MnJKfHmPopDhpy%2Fua%2F0jwrLZWOI%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/c9495202870b42d98d0e63910b6ab26f~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=j1xzHqSdF9%2FVWlp%2FfOH28yK5NhQ%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/74337a732ccb496cae137de5e7243311~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=LdL36SeejAvMZ0tCNmSQWtkN9bA%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/732afa46fce8452b948ea36710cdcc2b~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=iP%2FaBraDOutf%2FIsEtDHZ9u%2F%2BD6k%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>中配Club版经过运动化调校，将升级Bilstein减振器、前塔顶、LSD限滑差速器、DSC-Track动态稳定控制系统。同时在外观层面增加了亮黑色前唇、尾部扩散器、17英寸轮辋、鲨鱼鳍天线，并在车内升级9扬声器Bose品牌音响系统、SiriusXM卫星收音机（提供三个月的试用订阅）。</span></p><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/d4edf30cd88e452daefdb5b091baf82a~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=LCmrGQr7aakgETtr3ko67Fhbc9I%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>另外，中配Club版软顶敞篷车型可选装Brembo/BBS/Recaro套件（硬顶车型为标配），该选装包将提供Brembo前四活塞固定式制动卡钳、17英寸BBS锻造轮辋和Recaro运动座椅（带加热功能）、亮黑色侧裙和后保险杠空气动力学套件。 </span></p><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/478a0e0951e941b68808eb8c8b0a72b3~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=NbazvHN2FwTvTpb0PXQvlFHsE10%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>2025款马自达MX-5 Miata高配Grand Touring版提供黑色织物软顶敞篷或车身同色硬顶敞篷外观，升级自动大灯、雨量感应式雨刷、黑色真皮座椅、交通标识识别、自适应巡航控制系统等功能，另外还提供棕色Nappa真皮内饰选装。</span></p><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/2141b19a7c0d43d6844d679df8e03712~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=vZzcwh05Dr%2FBW2KNrFGj1lrbGc4%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>动力方面，此次在北美市场上市的2025款马自达MX-5 Miata均搭载2.0升自然吸气发动机，最大功率135千瓦，最大扭矩为205牛·米，传动系统提供6速手动变速箱或6速自动变速箱可选。</span></p><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/6e10bb1ad7f44053bd60d05531f19afb~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=2Yj2hMmgIAXqvT6UH45EyUsh6BI%3D&amp;psm=motor.pc_common.api"><p>曾在国内销售的2018款马自达MX-5</p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/443d7e295fea48009677dd9d4be20820~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=ixbD9knWBaCZMHCkVLZViR3zsVk%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p9-dcd-sign.byteimg.com/motor-article-img/b233684e92f044c78716e94b286584ac~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=joaxO3wu2bnIaCGlPvhKI68W%2Ffo%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>值得一提的是，本代马自达MX-5曾以官方渠道引入中国市场，其中2018款铂钢灰/珍珠白车型售价为33.9万元，水晶魂动红车型售价为34万元。</span></p><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/2eb9269686db4df98d7d34f6f3c2a2ce~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=aGUDNeIQ8Wp1MLhIOFiPQi5BzLw%3D&amp;psm=motor.pc_common.api"><p>马自达ICONIC SP概念车</p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/ca722d8fc9534b778c26582bb64d4bd8~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=TSsfYIs22tgDW3s17nEzR%2FOci7Q%3D&amp;psm=motor.pc_common.api"><p></p></div><div><img src="https://p3-dcd-sign.byteimg.com/motor-article-img/e0328c46a5234fd0bfeb1e2572b421c4~tplv-f042mdwyw7-original:480:0.webp?lk3s=125a4689&amp;x-expires=1749295287&amp;x-signature=J%2FWQ9kY7I6znS9EJJpzI9Qe%2BMhw%3D&amp;psm=motor.pc_common.api"><p></p></div><p><span>2023年日本移动出行展期间，马自达曾发布过一款ICONIC SP概念车，该车可以看作是下一代马自达MX-5的设计预览，量产版有望在2026年推出。更多有关马自达品牌的消息，懂车帝将保持关注。</span></p></section>',
            tabs: [
                { title: '車輛配備', code: 'car_equipments' },
                { title: '車輛描述', code: 'car_desc' },
                { title: '車商介紹', code: 'dealer_intro' },
            ]
        }
    },
    computed: {
        currentImage() {
            return this.carImages.images[this.currentImageIndex]
        },
        allSwaggerImages() {
            let result = [];
            if (this.carVideo && this.carVideo.video_url) {
                result.push({
                    url: this.carVideo.video_url,
                    type: this.isYoutubeVideo(this.carVideo.video_url) ? 'youtube' : 'video'
                });
            }
            result = result.concat(this.carImages.images.map(img => {
                return {
                    url: img,
                    type: 'image'
                }
            }));
            return result;
        }
    },
    mounted() {
        const swiper = this.$refs.mySwiper.swiper;
        swiper.on('slideChange', () => {
            this.currentMediaIndex = swiper.realIndex;
        });

        this.activeTab = this.tabs[0];
    },
    created() {
        // 页面加载时获取 id 参数
        const carId = this.$route.params.id
        console.log('当前车辆 ID:', carId)  // 可根据需求替换为实际业务逻辑（如请求数据）
        this.fetchCarBaseInfo(carId)  // 调用请求方法
        this.fetchCarEquipments(carId)  // 调用请求方法
    },
    methods: {
        fetchCarEquipments(carId) {
            let _this = this;
            axios.get(`/api/car/equipment/${carId}`)  // 替换为实际后端接口地址
                .then(response => {
                    // 成功获取数据后赋值给data属性
                    // this.carInfo = response.data.carInfo
                    _this.carEquipments = response.data.data;
                    console.log('获取车辆配备成功:', _this.carEquipments);
                })
                .catch(error => {
                    console.error('获取车辆详情失败:', error)
                    // 可添加错误提示逻辑（如显示错误信息）
                })
        },
        // 新增：定义获取车辆详情的请求方法
        fetchCarBaseInfo(carId) {
            let _this = this;
            axios.get(`/api/car/baseInfo/${carId}`)  // 替换为实际后端接口地址
                .then(response => {
                    // 成功获取数据后赋值给data属性
                    // this.carInfo = response.data.carInfo
                    let car = response.data.data;
                    console.log('获取车辆详情成功:', car);
                    _this.carInfo.specs = [
                        {name: '所在城市', value: '--'},
                        {name: '出厂日期', value: car.manufactureYear},
                        {name: '里程数', value: '--'},
                        {name: '引擎燃料', value: car.fuelSystem},
                        {name: '排气量', value: car.displacement},
                        {name: '变速系统', value: car.transmission},
                        {name: '车色', value: car.color},
                        {name: '车门数', value: car.doorCount},
                        {name: '乘坐人数', value: car.passengerCount},
                        {name: '汽车品牌', value: car.brand},
                        {name: '汽车型号', value: car.customModel},
                    ];
                    _this.carInfo.title = car.brand + ' ' + car.customModel + ' ' + car.manufactureYear;
                    _this.carInfo.price = car.salePrice;
                    console.log(_this.carInfo.specs);
                })
                .catch(error => {
                    console.error('获取车辆详情失败:', error)
                    // 可添加错误提示逻辑（如显示错误信息）
                })
        },
        changeMedia(index) {
            this.currentMediaIndex = index;
            const swiper = this.$refs.mySwiper.swiper;
            console.log('changeMedia', index, swiper);
            swiper.slideTo(index + 1);
        },
        getThumbnailSrc(media) {
            if (media.type === 'youtube') {
                return 'https://img.icons8.com/color/48/000000/youtube-play.png';
            } else if (media.type === 'video') {
                return 'https://via.placeholder.com/80x60?text=视频';
            }
            return media.url;
        },
        changeImage(index) {
            this.currentImageIndex = index
        },
        callPhone() {
            alert('拨打电话: 0800-123-456')
        },
        contactLine() {
            alert('Line联系: @car_dealer')
        },
        isYoutubeVideo(url) {
            return url && (url.includes('youtube.com') || url.includes('youtu.be'));
        },
        convertToEmbedUrl(url) {
            if (url.includes('youtube.com/watch?v=')) {
                return url.replace('watch?v=', 'embed/');
            }
            if (url.includes('youtu.be/')) {
                return url.replace('youtu.be/', 'youtube.com/embed/');
            }
            return url;
        }
    }
} 