// dom操作函数的封装
import { CLASS_NAME_PREFEX, TRANSPARENT } from './constants';

export const styleCache = new Map();

// some common styles
export const shapeStyle = (shape) => {
  const selector = `.${CLASS_NAME_PREFEX + shape}`;
  const rule = `{
    border-radius: ${shape === "rect" ? "0" : "50%"};
  }`;
  if (!styleCache.has(selector)) {
    styleCache.set(selector, rule);
  }
};

export const addStyle = (selector, rule) => {
  if (!styleCache.has(selector)) {
    styleCache.set(selector, rule);
  }
};

export const addClassName = (ele, classArray) => {
  for (const name of classArray) {
    ele.classList.add(name);
  }
};

export const setAttributes = (ele, attrs) => {
  Object.keys(attrs).forEach((k) => ele.setAttribute(k, attrs[k]));
};

export const setOpacity = (ele) => {
  const className = CLASS_NAME_PREFEX + "opacity";
  const rule = `{
      opacity: 0 !important;
    }`;
  addStyle(`.${className}`, rule);
  ele.classList.add(className);
};

export const transparent = (ele) => {
  const className = CLASS_NAME_PREFEX + "transparent";
  const rule = `{
      color: ${TRANSPARENT} !important;
    }`;
  addStyle(`.${className}`, rule);
  ele.classList.add(className);
};

export const removeElement = (ele) => {
  const parent = ele.parentNode;
  if (parent) {
    parent.removeChild(ele);
  }
};

export const emptyElement = (ele) => {
  ele.innerHTML = "";
};
