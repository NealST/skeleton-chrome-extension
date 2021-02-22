// 处理块级文本元素，比如像div下直接包文本的场景

export default function blockTextHandler(ele) {
  const textContent = ele.childNodes[0].textContent;
  ele.removeChild(ele.childNodes[0]);
  const newTextEle = document.createElement('span');
  newTextEle.textContent = textContent;
  if (ele.childNodes.length > 0) {
    ele.insertBefore(newTextEle, ele.childNodes[0]);
  } else {
    ele.appendChild(newTextEle);
  }
}