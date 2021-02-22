import { CLASS_NAME_PREFEX } from "./constants";
import { addStyle, addClassName } from "./dom-action";
import {
  getComputedStyle,
  addTextAlignFlex,
  addTextMask,
  getTextWidth,
} from "./utils";
// import md5 from './md5';

export default function textHandler(ele, color, cssUnit, decimal) {
  const comStyle = getComputedStyle(ele);
  const text = ele.textContent;
  // addTextAlignFlex(ele.parentNode);
  let {
    lineHeight,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    position: pos,
    fontSize,
    textAlign,
    wordSpacing,
    wordBreak,
  } = comStyle;

  if (!/\d/.test(lineHeight)) {
    const fontSizeNum = parseFloat(fontSize, 10) || 14;
    lineHeight = `${fontSizeNum * 1.4}px`;
  }

  const height = ele.offsetHeight;
  // Math.floor
  const lineCount =
    ((height - parseFloat(paddingTop, 10) - parseFloat(paddingBottom, 10)) /
      parseFloat(lineHeight, 10)) |
    0; // eslint-disable-line no-bitwise

  let textHeightRatio = parseFloat(fontSize, 10) / parseFloat(lineHeight, 10);
  if (Number.isNaN(textHeightRatio)) {
    textHeightRatio = 1 / 1.4; // default number
  }
  /* eslint-disable no-mixed-operators */

  const invariableClassName = CLASS_NAME_PREFEX + "text";
  let bgColor = color;
  let textWidth = 0;
  if (lineCount > 1) {
    addTextMask(ele, comStyle);
  } else {
    textWidth = getTextWidth(text, {
      fontSize,
      lineHeight,
      wordBreak,
      wordSpacing,
    });
    // if (textAlign) {
    //   const Stamp = md5(ele.childNodes[0].textContent).slice(0, 8);
    //   const childTextClass = `${ele.tagName}-child-${textAlign}-${Stamp}`;
    //   const eleFlexClass = `${ele.tagName}-${Stamp}`;

    //   let align = "flex-start";
    //   if (textAlign === "center") {
    //     align = "center";
    //   }
    //   if (textAlign === "right") {
    //     align = "flex-end";
    //   }
    //   const eleFlexRule = `{
    //                   display: flex;
    //                   flex-direction: row;
    //                   justify-content: ${align};
    //                   font-size: 0 !important;
    //               }`;
    //   const childTextRule = `{
    //                   background-color: #efefef;
    //                   width: ${(textWidth * 10) / window.innerWidth}rem;
    //                   height: ${(height * 10) / window.innerWidth}rem;
    //               }`;
    //   // addStyle(`.${childTextClass}`, childTextRule);
    //   // addStyle(`.${eleFlexClass}`, eleFlexRule);

    //   // addClassName(childTextEl, [childTextClass]);
    //   // addClassName(ele, [eleFlexClass]);
    //   bgColor = "#fff";
    // }
  }
 
  let invariableRule = `{
              background-color: ${bgColor} !important;
              color: transparent;
              width: auto;
              padding: 0 !important;
          }`;
  addStyle(`.${invariableClassName}`, invariableRule);
  addClassName(ele, [invariableClassName]);
}
