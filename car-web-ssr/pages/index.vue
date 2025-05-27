<template>
  <div class="home-page">
    <div class="container">
      <h1 class="text-center my-5">汽車網站</h1>
      <div class="text-center">
        <p class="lead">欢迎来到汽车详情网站</p>
        <p>这是基于Nuxt.js开发的SSR版本</p>
        
        <div class="mt-4">
          <h3>測試鏈接：</h3>
          <div class="test-links">
            <nuxt-link to="/test-car-123" class="btn btn-primary mx-2">
              查看測試汽車詳情
            </nuxt-link>
            <nuxt-link to="/sample-car-456" class="btn btn-secondary mx-2">
              查看示例汽車
            </nuxt-link>
          </div>
        </div>

        <div class="features mt-5">
          <h3>功能特色：</h3>
          <div class="row">
            <div class="col-md-4">
              <div class="feature-card">
                <h5>🚀 SSR支持</h5>
                <p>服务端渲染，提升SEO和首屏加载速度</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card">
                <h5>🔧 Vue2兼容</h5>
                <p>保持Vue2语法，降低迁移成本</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card">
                <h5>🎨 组件升级</h5>
                <p>升级到最新兼容版本的组件库</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head() {
    return {
      title: '汽車網站 - 首頁',
      meta: [
        { hid: 'description', name: 'description', content: '汽車詳情網站首頁，提供車輛展示和詳細信息查看' },
        { hid: 'keywords', name: 'keywords', content: '汽車,車輛,詳情,展示,Nuxt,SSR' }
      ]
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 50px 0;
}

.container {
  max-width: 1200px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.test-links {
  margin: 20px 0;
}

.btn {
  margin: 5px;
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: 2px solid #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: 2px solid #6c757d;
}

.btn-secondary:hover {
  background-color: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(108, 117, 125, 0.4);
}

h1 {
  font-size: 3.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

.lead {
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 10px;
}

h3 {
  margin: 30px 0 20px;
}

h5 {
  margin-bottom: 15px;
  font-size: 1.2rem;
}
</style> 