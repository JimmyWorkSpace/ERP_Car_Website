import Vue from 'vue'
import VueRouter from 'vue-router'
import CarDetail from '../components/CarDetail.vue'

Vue.use(VueRouter)  // 注册 Vue Router

const routes = [
  {
    path: '/car/detail/:id',  // :id 表示动态参数
    name: 'CarDetail',
    component: CarDetail
  }
]

const router = new VueRouter({
  routes  // 路由规则
})

export default router  // 导出路由实例