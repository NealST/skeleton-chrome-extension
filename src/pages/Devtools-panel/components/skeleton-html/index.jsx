import React, { useState, useEffect } from "react";
import Editor from "react-ace";
import ActionBar from "../action-bar";
import { transformToReact } from "./transform";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "./index.css";

const beautify = require("js-beautify");
const beautify_html = beautify.html;

export default function (props) {
  const { code, isMobile } = props;

  const formattedHtmlCode = beautify_html(code);

  let templateDslList = [
    {
      name: "html",
      code: formattedHtmlCode,
      mode: "html",
    },
    {
      name: "react",
      code: transformToReact(formattedHtmlCode),
      mode: "javascript",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  function onCodeChange() {}

  function onTabChange(index) {
    setActiveIndex(index)
  }

  if (isMobile) {
    // TODO: 添加移动模式下rax组件的转化
  }

  // 如果传入的code发生改变，那么也要同步更新状态
  useEffect(() => {
    setActiveIndex(0);
  }, [code]);

  const activeDsl = templateDslList[activeIndex];

  return (
    <div className="skeleton-html">
      <ActionBar title="skeleton-template" code={activeDsl.code} />
      <div className="code-tabs">
        {templateDslList.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
            className="tabs-item"
            style={{color: isActive ? '#5584ff' : '#fff', borderBottom: isActive ? '1px solid #5584ff' : 'none'}}
            key={item.name}
            onClick={() => onTabChange(index)}
          >
            {item.name}
          </div>
          )
        })}
      </div>
      <Editor
        mode={activeDsl.mode}
        theme="monokai"
        onChange={onCodeChange}
        value={activeDsl.code}
        className="html-editor"
        wrapEnabled={true}
        width="100%"
        height="100%"
        showPrintMargin={false}
      />
    </div>
  );
}
