import React, { useState } from 'react';
import SkeletonForm from './components/skeleton-form';
import SkeletonHtml from './components/skeleton-html';
import SkeletonCss from './components/skeleton-css';
import './app.css';

export default function() {

  const [ codeInfo, setCodeInfo ] = useState({
    html: '',
    css: '',
    isMobile: false
  });

  function getSkeletonCode(retCode) {
    console.log("code info", retCode);
    setCodeInfo(retCode);
  }

  return (
    <div className="devtools-panel">
      <div className="panel-header">
        <SkeletonForm getSkeletonCode={getSkeletonCode} />
      </div>
      <div className="panel-code">
        <div className="code-html">
          <SkeletonHtml code={codeInfo.html} isMobile={codeInfo.isMobile}/>
        </div>
        <div className="code-css">
          <SkeletonCss code={codeInfo.css} />
        </div>
      </div>
    </div>
  )
}