/**
 * [buttonHandler 改变 button 元素样式：包括去除 border和 box-shadow, 背景色和文字颜色统一]
 */
import { CLASS_NAME_PREFEX } from './constants';
import { addStyle } from './dom-action';

export default function buttonHandler(ele, { color, excludes = [] }) {
  if (excludes.indexOf(ele) > -1) return false;
  const classname = CLASS_NAME_PREFEX + "button";
  const rule = `{
      color: ${color} !important;
      background-color: ${color} !important;
      border: none !important;
      box-shadow: none !important;
    }`;
  addStyle(`.${classname}`, rule);
  ele.classList.add(classname);
}
