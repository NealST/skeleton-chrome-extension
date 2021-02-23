// 工具方法类

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const collectImportantComments = (css) => {
  const once = new Set();
  const cleaned = css.replace(/(\/\*![\s\S]*?\*\/)\n*/gm, (match, p1) => {
    once.add(p1);
    return "";
  });
  const combined = Array.from(once);
  combined.push(cleaned);
  return combined.join("\n");
};

// 处理骨架屏样式
export const processCss = function (styles) {
  const stylesheetAstArray = styles.map((style) => {
    const ast = parse(style, {
      parseValue: false,
      parseRulePrelude: false,
    });
    return toPlainObject(ast);
  });
};

// 收集页面中的样式类型links标签
export const getStyleLinks = function () {
  const links = Array.from(document.querySelectorAll("link"));
  return links
    .filter(
      (link) =>
        link.href &&
        (link.rel === "stylesheet" ||
          link.href.toLowerCase().endsWith(".css")) &&
        !link.href.toLowerCase().startsWith("blob:") &&
        link.media !== "print"
    )
    .map((link) =>
      link.href.indexOf("http") >= 0
        ? link.href
        : `${window.location.protocol}${link.href}`
    );
};

// html标签过滤
export const htmlFilter = function (htmlstr) {
  const filterTags = ["script", "iframe"];
  filterTags.forEach((tagItem) => {
    const theFilterReg = new RegExp(`<${tagItem}([^>]*)>.*?</${tagItem}>`, "g");
    htmlstr = htmlstr.replace(theFilterReg, "");
  });
  return htmlstr;
};

// 获取复制的容器元素
export const getClonedContainerEl = function (containerEl, containerId) {
  const cloneClass = `mz-sk-${containerId}-clone`;
  const skeletonStyle = document.getElementById('mz-skeleton');
  const existedCloneContainerEl = document.querySelector(`.${cloneClass}`);
  if (existedCloneContainerEl) {
    existedCloneContainerEl.parentNode.removeChild(existedCloneContainerEl);
  }
  if (skeletonStyle) {
    skeletonStyle.parentNode.removeChild(skeletonStyle);
  }
  let cloneContainerEl = containerEl.cloneNode(true);
  cloneContainerEl.style.display = "none";
  cloneContainerEl.classList.add(cloneClass);
  insertAfter(cloneContainerEl, containerEl);
  return cloneContainerEl;
};
