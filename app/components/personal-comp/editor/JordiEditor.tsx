'use client';

import React, { useEffect, useRef, useState } from "react";
import { Layout, theme, Space, Button, Input, message } from "antd";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { saveArticle } from "../../../service/article-service";
import { addToIpfs } from "../../../service/ipfs-service";
import { mintNFT } from "../../../service/nft-service";
import { messageBox } from "../../../service/message-service";

const { Content, Footer } = Layout;

// 动态导入JordiEditor以避免SSR问题
const JordiEditorComponent = dynamic(() => import("jodit-react"), {
  ssr: false,
});

type ButtonSize = "tiny" | "xsmall" | "small" | "middle" | "large";

const Example = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // 从URL参数中获取文章ID等信息
    const articleId = searchParams.get('id');
    if (articleId) {
      // 加载文章内容的逻辑
      // ...
    }
  }, [searchParams]);

  const config = {
    zIndex: 0,
    readonly: false,
    toolbarButtonSize: "middle" as ButtonSize,
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: false,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 400,
    direction: "ltr",
    language: "auto",
    debugLanguage: false,
    i18n: "en",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colorPickerDefaultTab: "background",
    imageDefaultWidth: 100,
    removeButtons: [],
    disablePlugins: [],
    extraButtons: [],
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    sizeSM: 400,
    buttons: [
      "source",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "video",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "symbol",
      "fullsize",
      "print",
      "about",
    ],
    buttonsXS: [
      "bold",
      "image",
      "|",
      "brush",
      "paragraph",
      "|",
      "align",
      "|",
      "undo",
      "redo",
      "|",
      "eraser",
      "fullsize",
    ],
    events: {},
    textIcons: false,
  };

  const handleSave = async () => {
    try {
      if (!title) {
        messageBox("warning", "", "请输入标题");
        return;
      }
      if (!content) {
        messageBox("warning", "", "请输入内容");
        return;
      }
      const result = await saveArticle(title, content);
      messageBox("success", "", "保存成功");
    } catch (error) {
      console.error(error);
      messageBox("danger", "", "保存失败");
    }
  };

  const handleMint = async () => {
    try {
      if (!title) {
        messageBox("warning", "", "请输入标题");
        return;
      }
      if (!content) {
        messageBox("warning", "", "请输入内容");
        return;
      }
      const cid = await addToIpfs(title, content);
      const result = await mintNFT(cid, title);
      messageBox("success", "", "铸造成功");
    } catch (error) {
      console.error(error);
      messageBox("danger", "", "铸造失败");
    }
  };

  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          background: colorBgContainer,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="请输入标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <JordiEditorComponent
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
          />
          <Space>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
            <Button type="primary" onClick={handleMint}>
              铸造NFT
            </Button>
          </Space>
        </Space>
      </Content>
    </Layout>
  );
};

export default Example;