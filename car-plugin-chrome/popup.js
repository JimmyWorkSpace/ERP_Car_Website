document.addEventListener('DOMContentLoaded', function() {
  const shareContent = document.getElementById('share-content');
  const shareBtn = document.getElementById('share-btn');
  const urlStatus = document.getElementById('url-status');
  const copyStatus = document.getElementById('copy-status');

  // 获取当前标签页信息
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentUrl = tabs[0].url;
    
    // 检查URL是否匹配规则
    if (checkUrlPattern(currentUrl)) {
      const carId = extractCarId(currentUrl);
      urlStatus.textContent = `已匹配页面，ID: ${carId}`;
      
      // 获取分享内容
      fetchShareContent(carId);
    } else {
      urlStatus.textContent = '未匹配目标页面';
      shareContent.value = '请在正确的页面打开此插件';
      shareBtn.disabled = true;
    }
  });

  // 点击复制按钮
  shareBtn.addEventListener('click', function() {
    shareContent.select();
    document.execCommand('copy');
    
    copyStatus.classList.remove('hidden');
    setTimeout(() => {
      copyStatus.classList.add('hidden');
    }, 2000);
  });

  // 检查URL是否匹配目标模式
  function checkUrlPattern(url) {
    const regex = /https:\/\/testcloud\.carce\.cc\/dailys\/sell_car\/edit_view\?id=\d+/;
    return regex.test(url);
  }

  // 从URL中提取车辆ID
  function extractCarId(url) {
    const regex = /id=(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // 获取分享内容
  function fetchShareContent(carId) {
    const apiUrl = `http://nas.yanjiashuo.cn:9999/api/car/sharePath/${carId}`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('网络响应异常');
        }
        return response.text();
      })
      .then(data => {
        shareContent.value = data;
        shareBtn.disabled = false;
      })
      .catch(error => {
        shareContent.value = `获取分享内容失败: ${error.message}`;
        shareBtn.disabled = true;
      });
  }
}); 