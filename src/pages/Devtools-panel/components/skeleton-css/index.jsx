import React from 'react';
import Editor from "react-ace";
import ActionBar from '../action-bar';
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import './index.css';

const beautify_css = require('js-beautify').css;

export default function (props) {

  const { code } = props; 

  const formattedCode = beautify_css(code);

  function onCodeChange() {

  }
    
  return (
    <div className="skeleton-css">
      <ActionBar title="skeleton-css" code={formattedCode}/>
      <Editor
        mode="css"
        theme="monokai"
        onChange={onCodeChange}
        value={formattedCode}
        className="css-editor"
        wrapEnabled={true}
        width="100%"
        height="100%"
        showPrintMargin={false}
      />
    </div>
  )
}