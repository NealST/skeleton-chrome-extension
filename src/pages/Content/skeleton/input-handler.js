// input元素处理
import { CLASS_NAME_PREFEX } from "./constants";
import { addStyle, addClassName } from "./dom-action";

export default function inputHandler(ele, color) {
    const invariableClassName = CLASS_NAME_PREFEX + "input";

    let invariableRule = `{
        background-color: ${color} !important;
        color: transparent !important;
        width: auto;
    }`;
addStyle(`.${invariableClassName}`, invariableRule);
addClassName(ele, [invariableClassName]);
}