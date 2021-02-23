import "../../assets/img/icon-34.png";
import "../../assets/img/icon-128.png";

let connections = {};

chrome.runtime.onConnect.addListener(function (port) {
  var extensionListener = function (message, sender, sendResponse) {
    // 原始的连接事件不包含开发者工具网页的标签页标识符，
    // 所以我们需要显式发送它。
    const { type, tabId } = message || {};
    if (type == "init") {
      connections[tabId] = port;
      return;
    }
    
  };

  // 监听开发者工具网页发来的消息
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(connections);
    for (var i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

// 接收消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("request", request);
  const { isToContent, tabId, info = {} } = request;
  if (isToContent) {
    // 如果是传给内容脚本
    chrome.tabs.sendMessage(tabId, info, function (response) {
      console.log("response from content", response);
      const thePort = connections[tabId];
      thePort.postMessage({
        type: info.type,
        info: response
      });
    });
  }
  
  // 实现文本复制能力
  if (info.type === 'copy') {
    const copyTextarea = document.getElementById('app-textarea');
    copyTextarea.value = info.data;
    copyTextarea.select();
    document.execCommand( 'copy');
    const thePort = connections[tabId];
    thePort.postMessage({
      type: info.type,
      info: ''
    });
  }

});
