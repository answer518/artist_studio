'use client';

import { EditOutlined, PoundOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import ArticleBrowser from "./home-comp/ArticleBrowser";
import MarketBrowser from "./home-comp/MarketBrowser";
import StarBrowser from "./home-comp/StarBrowser";
import { useState } from "react";

const { Content, Sider } = Layout;

export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const [selectedKey, setSelectedKey] = useState("article");

  const items = [
    {
      key: "article",
      icon: <EditOutlined />,
      label: <Link href="/article">文章</Link>,
    },
    {
      key: "market",
      icon: <PoundOutlined />,
      label: <Link href="/market">市场</Link>,
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "article":
        return <ArticleBrowser />;
      case "market":
        return <MarketBrowser />;
      default:
        return <ArticleBrowser />;
    }
  };

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
          defaultSelectedKeys={["article"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
          onSelect={({ key }) => setSelectedKey(key)}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[
            { title: "首页" },
            { title: selectedKey === "article" ? "文章" : selectedKey === "market" ? "市场" : "明星" },
          ]}
        />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}