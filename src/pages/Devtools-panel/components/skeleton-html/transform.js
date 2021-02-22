// 转化成react组件
export const transformToReact = function(htmlcode) {
  return `import React from 'react';
    
export default function() {
  return (
      ${htmlcode}
    )
  }
`
}