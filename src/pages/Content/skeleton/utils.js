// 骨架屏生成的工具方法
import { addStyle, addClassName } from './dom-action';
import { MOCK_TEXT_ID } from './constants';

export const getComputedStyle = window.getComputedStyle;
export const $$ = document.querySelectorAll.bind(document);
export const $ = document.querySelector.bind(document);
export const isBase64Img = (img) => /base64/.test(img.src);

// 获取容器元素
export const getRootElement = function (containerId) {
  return (
    (containerId && document.getElementById(containerId)) ||
    document.documentElement
  );
};

// 判断是否在视窗内
export const inViewPort = (ele) => {
  const rect = ele.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.left < window.innerWidth;
};

// 检查是否存在伪元素
export const checkHasPseudoEle = (ele) => {
  const hasBefore =
    getComputedStyle(ele, "::before").getPropertyValue("content") !== "";
  const hasAfter =
    getComputedStyle(ele, "::after").getPropertyValue("content") !== "";
  if (hasBefore || hasAfter) {
    return { hasBefore, hasAfter, ele };
  }
  return false;
};
// 检查是否存在边框
export const checkHasBorder = (styles) =>
  styles.getPropertyValue("border-style") !== "none";

// 获取相反形状
export const getOppositeShape = (shape) =>
  shape === "circle" ? "rect" : "circle";
// 检查是否存在文本decoration
export const checkHasTextDecoration = (styles) =>
  !/none/.test(styles.textDecorationLine);

export const getViewPort = () => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  return {
    vh,
    vw,
    vmax: Math.max(vw, vh),
    vmin: Math.min(vw, vh),
  };
};

export const px2relativeUtil = (px, unit = "rem", decimal = 4) => {
  const pxValue = typeof px === "string" ? parseFloat(px, 10) : px;
  if (unit === "rem") {
    const htmlElementFontSize = getComputedStyle(document.documentElement)
      .fontSize;
    return `${(pxValue / parseFloat(htmlElementFontSize, 10)).toFixed(
      decimal
    )}${unit}`;
  } else {
    const dimensions = getViewPort();
    const base = dimensions[unit];
    return `${((pxValue / base) * 100).toFixed(decimal)}${unit}`;
  }
};

export const getTextWidth = (text, style) => {
  let offScreenParagraph = document.querySelector(`#${MOCK_TEXT_ID}`);
  if (!offScreenParagraph) {
    const wrapper = document.createElement("p");
    offScreenParagraph = document.createElement("span");
    Object.assign(wrapper.style, {
      width: "10000px",
    });
    offScreenParagraph.id = MOCK_TEXT_ID;
    wrapper.appendChild(offScreenParagraph);
    document.body.appendChild(wrapper);
  }
  Object.assign(offScreenParagraph.style, style);
  offScreenParagraph.textContent = text;
  return offScreenParagraph.getBoundingClientRect().width;
};

export function addTextMask(
  paragraph,
  { textAlign, lineHeight, fontSize, paddingBottom, paddingLeft, paddingRight },
  maskWidthPercent = 0.5
) {
  let left;
  let right;
  switch (textAlign) {
    case "center":
      left = document.createElement("span");
      right = document.createElement("span");
      [left, right].forEach((mask) => {
        Object.assign(mask.style, {
          display: "inline-block",
          width: `${(maskWidthPercent / 2) * 100}%`,
          height: lineHeight,
          backgroundColor: "#fff",
          position: "absolute",
          bottom: paddingBottom,
        });
      });
      left.style.left = paddingLeft;
      right.style.right = paddingRight;
      paragraph.appendChild(left);
      paragraph.appendChild(right);
      break;
    case "right":
      left = document.createElement("span");
      Object.assign(left.style, {
        display: "inline-block",
        width: `${maskWidthPercent * 100}%`,
        height: lineHeight,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: paddingBottom,
        left: paddingLeft,
      });
      paragraph.appendChild(left);
      break;
    case "left":
    default:
      right = document.createElement("span");
      Object.assign(right.style, {
        display: "inline-block",
        width: `${maskWidthPercent * 100}%`,
        height: lineHeight,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: paddingBottom,
        right: paddingRight,
      });
      paragraph.appendChild(right);
      break;
  }
}

export function addTextAlignFlex(ele) {
  const styleInfo = getComputedStyle(ele);
  if (
    styleInfo.textAlign &&
    styleInfo.textAlign !== "left" &&
    styleInfo.textAlign !== "start"
  ) {
    let flexPosition = "flex-end";
    const textAlignClass = "text-align-class";
    if (styleInfo.textAlign === "center") {
      flexPosition = "center";
    }
    const alignRules = `{
                  display: flex;
                  flex-direction: row;
                  justify-content: ${flexPosition};
              }`;
    addStyle(`.${textAlignClass}`, alignRules);
    addClassName(ele, [textAlignClass]);
  }
}

// 判断是否为文本元素
export function checkIsTextEl(ele) {
  return ele.tagName !== "SCRIPT" &&
  ele.tagName !== "STYLE" &&
  ele.childNodes && ele.childNodes.length > 0 &&
  ele.childNodes[0].nodeType === Node.TEXT_NODE &&
  /\S/.test(ele.childNodes[0].textContent)
}

// 判断是否为块级元素
export function checkIsBlockEl(ele) {
  const comStyle = getComputedStyle(ele);
  return comStyle.display !== 'inline';
}
