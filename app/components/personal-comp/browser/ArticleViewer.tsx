'use client';

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Input, Layout, theme } from "antd";
import { useSearchParams } from "next/navigation";
import { Content } from "antd/es/layout/layout";

// 动态导入JoditEditor以避免SSR问题
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

interface ArticleViewerProps {
  title?: string;
  content?: string;
}

const ArticleViewer = ({ title: initialTitle, content: initialContent }: ArticleViewerProps) => {
  const editor = useRef(null);
  const [content, setContent] = useState(initialContent || "");
  const [title, setTitle] = useState(initialTitle || "");
  const searchParams = useSearchParams();

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
    // 如果有传入的props，使用props；否则尝试从URL状态获取
    if (!initialTitle && !initialContent) {
      const state = window.history.state;
      if (state?.state) {
        setTitle(state.state.title || "");
        setContent(state.state.content || "");
      }
    }
  }, [initialTitle, initialContent]);

  return (
    <Layout>
      <Content>
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
      </Content>
    </Layout>
  );
};

export default ArticleViewer;