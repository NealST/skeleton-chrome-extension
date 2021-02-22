import { genSkeletonCss, getHtmlAndStyle } from './skeleton';
import { htmlFilter, getClonedContainerEl } from './utils';
let queryInfo = null;
let containerEl = null;
let clonedContainerEl = null;
let skeletonInfo = null;
let displayStyle = '';

chrome.runtime.onMessage.addListener(async function(req, sender, sendRes) {
  switch (req.type) {
    case 'generate':
      const { containerId } = req.data;
      queryInfo = req.data;
      containerEl = document.querySelector(containerId);
      if (!containerEl) {
        sendRes(null);
        return
      }
      displayStyle = window.getComputedStyle(containerEl).display;
      clonedContainerEl = getClonedContainerEl(containerEl, containerId);
      await genSkeletonCss(clonedContainerEl, req.data);
      const { style, cleanedHtml } = await getHtmlAndStyle(clonedContainerEl);
      const isMobile = window.navigator.userAgent.toLowerCase().indexOf('mobile') > 0;
      skeletonInfo = {
        html: htmlFilter(cleanedHtml),
        css: style,
        isMobile
      };
      sendRes(skeletonInfo);
      break;
    case 'show':
      containerEl.style.display = 'none';
      clonedContainerEl.style.display = displayStyle;
      break;
    case 'hide':
      containerEl.style.display = displayStyle;
      clonedContainerEl.style.display = 'none';
      break;
    case 'query':
      sendRes({
        isInPreview: clonedContainerEl && clonedContainerEl.style.display !== 'none',
        queryInfo,
        skeletonInfo
      });
      break;
  }
});
