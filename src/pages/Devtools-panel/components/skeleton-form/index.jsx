import React, { useState, useEffect } from "react";
import { Form, Input, Switch, Message } from "@alifd/next";
import { sendMsgToContent } from "../../utils";
import "./index.css";
const FormItem = Form.Item;
let hasQuery = false;
let isInPreview = false;

const SkeletonForm = (props) => {
  const { getSkeletonCode } = props;

  const [queryInfo, setQueryInfo] = useState(null);

  function generateSkeleton(info, error) {
    if (error) {
      return;
    }
    sendMsgToContent(
      {
        type: "generate",
        data: info,
      },
      async (res) => {
        console.log("content response", res);
        if (!res) {
          // 如果没有res数据，说明输入的css选择器是无效的
          Message.show({
            type: "error",
            content: "未找到容器元素，请检查输入的容器选择器字符串"
          });
          return
        }
        isInPreview = false;
        Message.show({
          type: "success",
          content: "骨架屏生成成功~，可以通过右侧开关控制预览",
        });
        setQueryInfo(info);
        getSkeletonCode(res);
      }
    );
  }

  function onPcPreviewChange(value) {
    sendMsgToContent({
      type: value ? "show" : "hide",
    }, () => {

    });
  }

  // 查询状态
  useEffect(() => {
    if (!hasQuery) {
      hasQuery = true;
      sendMsgToContent(
        {
          type: "query",
        },
        (res) => {
          console.log("query res", res);
          if (res) {
            isInPreview = res.isInPreview;
            const skeletonInfo = res.skeletonInfo;
            if (skeletonInfo) {
              getSkeletonCode(skeletonInfo)
            }
            setQueryInfo(res.queryInfo);
          }
        }
      );
    }
  });

  return (
    <div className="skeleton-form">
      <Form className="form-instance">
        <FormItem
          label="容器元素css选择器"
          required
          requiredMessage="容器元素选择器不能为空"
        >
          {queryInfo && queryInfo.containerId ? (
            <Input
              name="containerId"
              placeholder="请填写容器元素css选择器"
              defaultValue={queryInfo.containerId}
              className="container-input"
            />
          ) : (
            <Input className="container-input" name="containerId" placeholder="请填写容器元素css选择器" />
          )}
        </FormItem>
        <FormItem label="骨架屏颜色">
          {queryInfo && queryInfo.color ? (
            <Input
              name="color"
              placeholder="请填写主题色"
              defaultValue={queryInfo.color}
            />
          ) : (
            <Input name="color" placeholder="请填写主题色" />
          )}
        </FormItem>
        <Form.Submit
          className="app-submit"
          type="primary"
          validate
          onClick={generateSkeleton}
        >
          生成骨架屏
        </Form.Submit>
      </Form>
      {queryInfo ? (
        <div className="control-preview">
          <span className="preview-label">预览</span>
          <Switch
            size="small"
            defaultChecked={isInPreview}
            onChange={onPcPreviewChange}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SkeletonForm;
