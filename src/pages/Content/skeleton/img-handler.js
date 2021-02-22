import { CLASS_NAME_PREFEX, SMALLEST_BASE64 } from './constants';
import { addStyle, setAttributes, shapeStyle, addClassName } from './dom-action';

export default function imgHandler(ele, { color, shape, shapeOpposite }) {
  const { width, height } = ele.getBoundingClientRect();
  const attrs = {
    width,
    height,
    src: SMALLEST_BASE64,
  };

  const finalShape =
    shapeOpposite.indexOf(ele) > -1 ? getOppositeShape(shape) : shape;

  setAttributes(ele, attrs);

  const className = CLASS_NAME_PREFEX + "image";
  const shapeName = CLASS_NAME_PREFEX + finalShape;
  const rule = `{
      background-color: ${color} !important;
    }`;
  addStyle(`.${className}`, rule);
  shapeStyle(finalShape);

  addClassName(ele, [className, shapeName]);

  if (ele.hasAttribute("alt")) {
    ele.removeAttribute("alt");
  }
}
