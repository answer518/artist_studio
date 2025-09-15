'use client'
import {
  EditOutlined,
  PropertySafetyOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";

const { Content, Sider } = Layout;

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "collectible",
      icon: <PropertySafetyOutlined />,
      label: "藏品",
      children: [
        {
          key: "collectible-mint",
          label: <Link href="/personal/collectible-mint">铸币</Link>,
        },
        {
          key: "collectible-browse",
          label: <Link href="/personal/collectible-browse">浏览</Link>,
        },
      ],
    },
    {
      key: "article",
      icon: <EditOutlined />,
      label: "文章",
      children: [
        {
          key: "article-write",
          label: <Link href="/personal/article-write">写文章</Link>,
        },
        {
          key: "article-scratch",
          label: <Link href="/personal/article-scratch">草稿</Link>,
        },
        {
          key: "article-browse",
          label: <Link href="/personal/article-browse">浏览</Link>,
        },
      ],
    },
  ];

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
          defaultSelectedKeys={["collectible-mint"]}
          defaultOpenKeys={["collectible", "article"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
          onSelect={({ key }) => console.log(key)}
        />
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}