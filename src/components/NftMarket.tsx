/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../index.css";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Space, Layout, theme, message, Dropdown } from "antd";

const { Search } = Input;
const { Content } = Layout;

const onSearch = (value: string) => console.log(value);

const onClick: MenuProps["onClick"] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps["items"] = [
  {
    label: "书法",
    key: "1",
    // children: [
    //   {
    //     label: "传统",
    //     key: "1",
    //   },
    //   {
    //     label: "当代",
    //     key: "2",
    //   },
    //   {
    //     label: "传统",
    //     key: "3",
    //   },
    // ],
  },
  {
    label: "绘画",
    key: "2",
  },
  {
    label: "诗词",
    key: "3",
  },
];
export default function NftMarket() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <div style={{ margin: "16px 0" }}>
        <Space>
          <Dropdown menu={{ items, onClick }}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Space>
                分类
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </Space>
      </div>
      <Content
        style={{
          padding: 24,
          margin: 0,
          height: 800,
          background: colorBgContainer,
        }}
      ></Content>
    </Layout>
  );
}
