// 背景处理
import { CLASS_NAME_PREFEX } from './constants';
import { addStyle, shapeStyle, addClassName } from './dom-action';

export default function backgroundHandler(ele, { color, shape }) {
  const imageClass = CLASS_NAME_PREFEX + "image";
  const shapeClass = CLASS_NAME_PREFEX + shape;
  const rule = `{
      background-color: ${color} !important;
    }`;

  addStyle(`.${imageClass}`, rule);

  shapeStyle(shape);

  addClassName(ele, [imageClass, shapeClass]);
}
