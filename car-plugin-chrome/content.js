// 监听页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 发送消息到后台脚本，通知页面已加载
  chrome.runtime.sendMessage({
    action: 'pageLoaded',
    url: window.location.href
  });
});

// 监听URL变化（对于单页应用）
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // 发送消息到后台脚本，通知URL已变化
    chrome.runtime.sendMessage({
      action: 'urlChanged',
      url: lastUrl
    });
  }
}).observe(document, {subtree: true, childList: true});

// 监听来自插件的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getCarId') {
    // 从URL中提取车辆ID
    const regex = /id=(\d+)/;
    const match = window.location.href.match(regex);
    const carId = match ? match[1] : null;
    
    sendResponse({carId: carId});
  }
  return true;
});