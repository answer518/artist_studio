'use client';

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Space, Layout, theme, message, Dropdown } from "antd";
import { useState } from "react";

const { Search } = Input;
const { Content } = Layout;

const onSearch = (value: string) => console.log(value);

export default function NftMarket() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const items: MenuProps["items"] = [
    {
      label: "书法",
      key: "1",
    },
    {
      label: "绘画",
      key: "2",
    },
    {
      label: "摄影",
      key: "3",
    },
    {
      label: "音乐",
      key: "4",
    },
  ];

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
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Space>
            <Search
              placeholder="搜索NFT"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
            <Dropdown menu={{ items, onClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  分类
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
          <div>NFT市场内容区域</div>
        </Space>
      </Content>
    </Layout>
  );
}