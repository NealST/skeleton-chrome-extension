import axios from "axios";

const tabId = chrome.devtools.inspectedWindow.tabId;

let processFnMap = {};

// 建立与background页面的链接
export const buildConnectionWithBg = function () {
  const connection = chrome.runtime.connect({
    name: `skeleton-panel-${tabId}`,
  });
  connection.postMessage({
    type: "init",
    tabId,
  });
  return connection;
};

// 处理来自后台网页的响应
export const processMessageFromBg = function (message) {
  console.log("get message", message);
  const processFn = processFnMap[message.type];
  processFn && processFn(message.info);
};

// 过滤无用样式得到最终样式
export const getSkeletonStyle = async function (styles, styleLinks) {
  const styleLinkContentList = await Promise.all(
    styleLinks.map((linkItem) => axios.get(linkItem))
  );
  const retStyles = `${styles.join("\n")}\n${styleLinkContentList
    .map((item) => item.data)
    .join("\n")}`;
  return retStyles;
};

// 与content脚本进行通信
export const sendMsgToContent = function (info, cb) {
  processFnMap[info.type] = processFnMap[info.type] || cb;
  chrome.runtime.sendMessage({
    tabId,
    isToContent: true,
    info,
  });
};

// 执行复制
export const sendCopyCommand = function (info, cb) {
  processFnMap[info.type] = processFnMap[info.type] || cb;
  chrome.runtime.sendMessage({
    tabId,
    info,
  });
};
