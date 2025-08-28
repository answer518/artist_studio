import React from "react";
import "../index.css";

import { EditOutlined, PoundOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import ArticleBrowser from "./home-comp/ArticleBrowser";
import MarketBrowser from "./home-comp/MarketBrowser";
import StarBrowser from "./home-comp/StarBrowser";
const { Content, Sider } = Layout;

export default function Home() {
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
          theme="light"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key={"article"} icon={React.createElement(EditOutlined)}>
            <Link to="article">文章</Link>
          </Menu.Item>
          <Menu.Item key={"market"} icon={React.createElement(PoundOutlined)}>
            <Link to="market">市场</Link>
          </Menu.Item>
          <Menu.Item key={"star"} icon={React.createElement(UserOutlined)}>
            <Link to="star">明星</Link>
          </Menu.Item>
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
            <Route path="article" element={<ArticleBrowser />} />
            <Route path="market" element={<MarketBrowser />} />
            <Route path="star" element={<StarBrowser />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
