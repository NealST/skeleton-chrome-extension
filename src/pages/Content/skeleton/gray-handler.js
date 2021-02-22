import { CLASS_NAME_PREFEX } from './constants';
import { addStyle } from './dom-action';

export default function grayHandler(ele, { color }) {
  const classname = CLASS_NAME_PREFEX + "gray";
  const rule = `{
      color: ${color} !important;
      background-color: ${color} !important;
    }`;
  addStyle(`.${classname}`, rule);
  ele.classList.add(classname);

  const elements = ele.querySelectorAll("*");
  Array.from(elements).forEach((element) => {
    const childNodes = element.childNodes;
    if (Array.from(childNodes).some((n) => n.nodeType === Node.TEXT_NODE)) {
      element.classList.add(classname);
    }
  });
}
