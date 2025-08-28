import React from "react";
import "../index.css";
import {
  PoundOutlined,
  FileOutlined,
  EditOutlined,
  FolderViewOutlined,
  // BookOutlined,
  PropertySafetyOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Divider } from "antd";
import { Routes, Route, Link } from "react-router-dom";

import NftMintor from "./personal-comp/NftMintor";
import MyNft from "./personal-comp/MyNft";
import ArticleEditor from "./personal-comp/ArticleEditor";
import ArticleList from "./personal-comp/ArticleList";
import ArticleScratch from "./personal-comp/ArticleScratch";

const { Content, Sider } = Layout;

export default function Personal() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={200}
        style={{ background: colorBgContainer }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.SubMenu title="藏品">
            <Menu.Item icon={React.createElement(PoundOutlined)}>
              <Link to="collectible-mint">铸币</Link>
            </Menu.Item>
            <Menu.Item icon={React.createElement(PropertySafetyOutlined)}>
              <Link to="collectible-browse">浏览</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="文章">
            <Menu.Item icon={React.createElement(EditOutlined)}>
              <Link to="article-write">写文章</Link>
            </Menu.Item>
            <Menu.Item icon={React.createElement(FileOutlined)}>
              <Link to="article-scratch">草稿</Link>
            </Menu.Item>
            <Menu.Item icon={React.createElement(FolderViewOutlined)}>
              <Link to="article-browse">浏览</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Divider />
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb
          items={[
            { key: 1, title: "Home" },
            { key: 2, title: "List" },
            { key: 3, title: "App" },
          ]}
          style={{ margin: "16px 0" }}
        ></Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="article-write" element={<ArticleEditor />} />
            <Route path="article-scratch" element={<ArticleScratch />} />
            <Route path="article-browse" element={<ArticleList />} />
            <Route path="collectible-mint" element={<NftMintor />} />
            <Route path="collectible-browse" element={<MyNft />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
