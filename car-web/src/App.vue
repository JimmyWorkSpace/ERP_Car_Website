<template>
  <div id="app">
    <router-view />  <!-- 路由匹配的组件将在此处渲染 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4915613 */
  src: url('//at.alicdn.com/t/c/font_4915613_21lotjp1p2vh.woff2?t=1748187724151') format('woff2'),
       url('//at.alicdn.com/t/c/font_4915613_21lotjp1p2vh.woff?t=1748187724151') format('woff'),
       url('//at.alicdn.com/t/c/font_4915613_21lotjp1p2vh.ttf?t=1748187724151') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
</style>

