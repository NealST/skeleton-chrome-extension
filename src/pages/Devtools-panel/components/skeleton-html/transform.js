// 转化成react组件
export const transformToReact = function(htmlcode) {
  return `import React from 'react';

function createMarkup() {
  return {__html: '${htmlcode}'}
}

export default function() {
  return (
      <div dangerouslySetInnerHTML={createMarkup()} />
    )
  }
`
}