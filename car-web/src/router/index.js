import Vue from 'vue'
import VueRouter from 'vue-router'
import CarDetail from '../components/CarDetail.vue'

Vue.use(VueRouter)  // 注册 Vue Router

const routes = [
  {
    path: '/:id',  // 修改路径，去掉detail部分
    name: 'CarDetail',
    component: CarDetail
  }
]

const router = new VueRouter({
  mode: 'history',  // 添加history模式，去掉#号
  routes  // 路由规则
})

export default router  // 导出路由实例