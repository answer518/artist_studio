import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { Input, Layout, theme } from "antd";
import { useLocation } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const Example = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const config = {
    zIndex: 0,
    readonly: false,
    theme: "default",
    height: 400,
    imageDefaultWidth: 100,
  };

  useEffect(() => {
    setTitle(location?.state.title);
    setContent(location?.state.content);
  }, []);

  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          margin: 0,
          background: colorBgContainer,
        }}
      ></Content>
      <Input
        placeholder="请输入标题"
        style={{ textAlign: "center", fontSize: 24 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <JoditEditor
        ref={editor}
        config={config}
        value={content}
        onBlur={(newContent) => setContent(newContent)}
      />
    </Layout>
  );
};

export default Example;
