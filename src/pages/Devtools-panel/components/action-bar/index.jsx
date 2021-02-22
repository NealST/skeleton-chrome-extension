import React from 'react';
import { Button, Message } from '@alifd/next';
import { sendCopyCommand } from '../../utils';
import './index.css';

export default function ActionBar(props) {
  const { title, code } = props;

  function onCopy() {
    sendCopyCommand({
      type: 'copy',
      data: code
    }, () => {
      Message.show({
        type: 'success',
        content: '复制成功'
      });
    })
  }

  return (
    <div className="action-bar">
      <div className="bar-title">{title}</div>
      <div className="bar-action">
        <Button size="small" onClick={onCopy}>拷贝代码</Button>
      </div>
    </div>
  )
}