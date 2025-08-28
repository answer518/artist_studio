import React, { useEffect, useRef, useState } from "react";
import { Layout, theme, Space, Button, Input, message } from "antd";
import { useLocation } from "react-router-dom";
import JordiEditor from "jodit-react";
import { saveArticle } from "../../../service/store-service";
import { addToIpfs } from "../../../service/ipfs-service";
import { mintNFT } from "../../../service/nft-service";
import { messageBox } from "../../../service/message-service";

const { Content, Footer } = Layout;

type ButtonSize = "tiny" | "xsmall" | "small" | "middle" | "large";
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
    toolbarButtonSize: "middle" as ButtonSize,
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: false,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 400,
    imageDefaultWidth: 100,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  useEffect(() => {
    setTitle(location.state.title);
    setContent(location.state.content);
  }, []);

  async function publishPost() {
    await mintArticle();
  }

  async function mintArticle() {
    let uri = await addToIpfs(content);
    messageBox("success", "", uri);
    let meta = { name: title, description: title, type: "article", uri };
    let entity = JSON.stringify(meta);
    let tokenURI = await addToIpfs(entity);
    messageBox("success", "", tokenURI);
    let { success, tokenId } = await mintNFT(tokenURI);
    if (success) {
      messageBox("success", "", String(tokenId));
    } else {
      messageBox("danger", "", "mint failed!");
    }
  }

  async function savePost() {
    saveArticle(title, content);
  }

  async function previewPost() {
    console.log("previewPost");
  }

  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Input
          value={title}
          style={{ textAlign: "center", fontSize: 24 }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="请输入文章标题"
        />
      </Content>
      <JordiEditor
        ref={editor}
        config={config}
        value={content}
        onBlur={(newContent: string) => {
          setContent(newContent);
        }}
      />
      <Footer>
        <Space wrap>
          <Button type="primary" onClick={publishPost}>
            发表
          </Button>
          <Button type="primary" onClick={savePost}>
            保存
          </Button>
          <Button type="primary" onClick={previewPost}>
            预览
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
};

export default Example;
