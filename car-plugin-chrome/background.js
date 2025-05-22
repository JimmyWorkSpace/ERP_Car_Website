// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 检查URL是否匹配目标页面
  if (changeInfo.url && isTargetUrl(changeInfo.url)) {
    // 更新图标状态，表示插件在当前页面可用
    chrome.action.setIcon({
      path: "images/icon128.png",
      tabId: tabId
    });
    
    // 启用插件按钮
    chrome.action.enable(tabId);
  } else if (changeInfo.url) {
    // 如果不是目标页面，使用灰度图标
    chrome.action.setIcon({
      path: "images/icon128.png", // 理想情况应该有个灰度图标，这里复用了
      tabId: tabId
    });
    
    // 禁用插件按钮（可选）
    // chrome.action.disable(tabId);
  }
});

// 检查URL是否匹配目标模式
function isTargetUrl(url) {
  const regex = /https:\/\/testcloud\.carce\.cc\/dailys\/sell_car\/edit_view\?id=\d+/;
  return regex.test(url);
} 