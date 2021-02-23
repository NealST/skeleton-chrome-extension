import svgHandler from "./svg-handler";
import textHandler from "./text-handler";
import listHandler from "./list-handler";
import buttonHandler from "./button-handler";
import backgroundHandler from "./background-handler";
import imgHandler from "./img-handler";
import pseudosHandler from "./pseudos-handler";
import grayHandler from "./gray-handler";
import blockTextHandler from './block-text-handler';
import inputHandler from "./input-handler";
import {
  getComputedStyle,
  checkHasPseudoEle,
  checkHasBorder,
  checkHasTextDecoration,
  isBase64Img,
  $$,
  $,
  checkIsTextEl,
  checkIsBlockEl
} from "./utils";
import { DISPLAY_NONE, EXT_REG, GRADIENT_REG, MOCK_TEXT_ID, Node, DEFAULT_COLOR } from "./constants";
import { transparent, removeElement, styleCache } from "./dom-action";

// 查找并处理元素
function traverse(containerEl, options) {
  const { excludes = [], cssUnit = "px", containerId, color } = options;
  const themeColor = color || DEFAULT_COLOR;
  const excludesEle =
    excludes && excludes.length ? Array.from($$(excludes.join(","))) : [];
  const svg = {
    color: themeColor,
    shape: "circle",
    shapeOpposite: [],
  };
  const text = themeColor;
  const button = {
    color: themeColor
  };
  const image = {
    shape: "rect",
    color: themeColor,
    shapeOpposite: [],
  };
  const pseudo = {
    color: themeColor,
    shape: "circle",
    shapeOpposite: [],
  };
  const decimal = 4;
  const texts = [];
  const buttons = [];
  const hasImageBackEles = [];
  let toRemove = [];
  const imgs = [];
  const svgs = [];
  const inputs = [];
  const pseudos = [];
  const gradientBackEles = [];
  const grayBlocks = [];
  (function preTraverse(ele) {
    const styles = getComputedStyle(ele);
    const hasPseudoEle = checkHasPseudoEle(ele);
    if (
      !ele.classList.contains(`mz-sk-${containerId}-clone`) &&
      DISPLAY_NONE.test(ele.getAttribute("style"))
    ) {
      return toRemove.push(ele);
    }

    if (~excludesEle.indexOf(ele)) return false; // eslint-disable-line no-bitwise

    if (hasPseudoEle) {
      pseudos.push(hasPseudoEle);
    }

    if (checkHasBorder(styles)) {
      ele.style.border = "none";
    }
    let styleAttr = ele.getAttribute("style");
    if (styleAttr) {
      if (/background-color/.test(styleAttr)) {
        styleAttr = styleAttr.replace(
          /background-color:([^;]+);/,
          "background-color:#fff;"
        );
        ele.setAttribute("style", styleAttr);
      }
      if (/background-image/.test(styleAttr)) {
        styleAttr = styleAttr.replace(/background-image:([^;]+);/, "");
        ele.setAttribute("style", styleAttr);
      }
    }

    if (ele.children && ele.children.length > 0 && /UL|OL|TBODY/.test(ele.tagName)) {
      listHandler(ele);
    }
    
    // 如果是块级文本元素
    if (checkIsTextEl(ele) && checkIsBlockEl(ele)) {
      blockTextHandler(ele)
    }

    if (ele.children && ele.children.length > 0) {
      Array.from(ele.children).forEach((child) => preTraverse(child));
    }

    // 将所有拥有 textChildNode 子元素的元素的文字颜色设置成背景色，这样就不会在显示文字了。
    if (
      ele.childNodes &&
      Array.from(ele.childNodes).some((n) => n.nodeType === Node.TEXT_NODE)
    ) {
      transparent(ele);
    }
    if (checkHasTextDecoration(styles)) {
      ele.style.textDecorationColor = TRANSPARENT;
    }
    // 隐藏所有 svg 元素
    if (ele.tagName === "svg") {
      return svgs.push(ele);
    }

    // 输入框元素
    if (ele.tagName === "INPUT") {
      return inputs.push(ele);
    }

    if (
      EXT_REG.test(styles.background) ||
      EXT_REG.test(styles.backgroundImage)
    ) {
      return hasImageBackEles.push(ele);
    }
    if (
      GRADIENT_REG.test(styles.background) ||
      GRADIENT_REG.test(styles.backgroundImage)
    ) {
      return gradientBackEles.push(ele);
    }
    if (ele.tagName === "IMG" || isBase64Img(ele) || ele.tagName === "FIGURE") {
      return imgs.push(ele);
    }
    if (
      ele.nodeType === Node.ELEMENT_NODE &&
      (ele.tagName === "BUTTON" ||
        (ele.tagName === "A" && ele.getAttribute("role") === "button"))
    ) {
      return buttons.push(ele);
    }
    if (checkIsTextEl(ele)) {
      return texts.push(ele);
    }
  })(containerEl);

  svgs.forEach((e) => svgHandler(e, svg, cssUnit, decimal));
  inputs.forEach(e => inputHandler(e, themeColor));
  texts.forEach((e) => textHandler(e, text, cssUnit, decimal));
  buttons.forEach((e) => buttonHandler(e, button));
  hasImageBackEles.forEach((e) => backgroundHandler(e, image));
  imgs.forEach((e) => imgHandler(e, image));
  pseudos.forEach((e) => pseudosHandler(e, pseudo));
  gradientBackEles.forEach((e) => backgroundHandler(e, image));
  grayBlocks.forEach((e) => grayHandler(e, button));
  // remove mock text wrapper
  const offScreenParagraph = $(`#${MOCK_TEXT_ID}`);
  if (offScreenParagraph && offScreenParagraph.parentNode) {
    toRemove.push(offScreenParagraph.parentNode);
  }
  toRemove.forEach((e) => removeElement(e));
}

// 生成骨架屏样式
export function genSkeletonCss(containerEl, options) {
  traverse(containerEl, options);
  let rules = "";
  for (let [selector, rule] of styleCache) {
    rules += `${selector} ${rule}\n`;
  }
  let styleEle = document.createElement("style");
  styleEle.id = 'mz-skeleton';
  styleEle.innerHTML = rules;
  if (document.head) {
    document.head.appendChild(styleEle);
  } else {
    document.body.appendChild(styleEle);
  }
}

// 获取页面html元素与style内容
export function getHtmlAndStyle(containerEl) {
  // fix html parser can not handle `<div ubt-click=3659 ubt-data="{&quot;restaurant_id&quot;:1236835}" >`
  // need replace `&quot;` into `'`
  const mockId = 'mz-sk-mock-parent';
  const existedMockEle = document.getElementById(mockId);
  if (existedMockEle) {
    existedMockEle.parentNode.removeChild(existedMockEle);
  }
  const mockEle = document.createElement('div');
  const mockContainerEle = containerEl.cloneNode(true);
  mockEle.id = mockId;
  mockEle.style.display = 'none';
  document.body.appendChild(mockEle);
  
  mockEle.appendChild(mockContainerEle);
  return {
    style: document.getElementById('mz-skeleton').innerHTML,
    cleanedHtml: mockEle.innerHTML.replace(/&quot;/g, "'"),
  };
}
