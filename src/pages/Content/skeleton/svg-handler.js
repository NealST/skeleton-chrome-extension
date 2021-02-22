import { CLASS_NAME_PREFEX, TRANSPARENT } from './constants';
import { 
  removeElement, 
  emptyElement, 
  shapeStyle, 
  addClassName,
  setOpacity,
  addStyle
} from './dom-action';
import { px2relativeUtil } from './utils';

export default function svgHandler(ele, { color, shape, shapeOpposite }, cssUnit, decimal) {
  const { width, height } = ele.getBoundingClientRect();

  if (
    width === 0 ||
    height === 0 ||
    ele.getAttribute("aria-hidden") === "true"
  ) {
    return removeElement(ele);
  }

  const finalShape =
    shapeOpposite.indexOf(ele) > -1 ? getOppositeShape(shape) : shape;

  emptyElement(ele);

  const shapeClassName = CLASS_NAME_PREFEX + shape;
  shapeStyle(shape);

  Object.assign(ele.style, {
    width: px2relativeUtil(width, cssUnit, decimal),
    height: px2relativeUtil(height, cssUnit, decimal),
  });

  addClassName(ele, [shapeClassName]);

  if (color === TRANSPARENT) {
    setOpacity(ele);
  } else {
    const className = CLASS_NAME_PREFEX + "svg";
    const rule = `{
        background-color: ${color} !important;
      }`;
    addStyle(`.${className}`, rule);
    ele.classList.add(className);
  }
}
