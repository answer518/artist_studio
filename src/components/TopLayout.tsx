import React from "react";
import "../index.css";
import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom";

import Connect from "./Connect";

import Home from "./Home";
import Personal from "./Personal";
import NftMarket from "./NftMarket";

import styles from "./TopLayout.module.css";
const { Header } = Layout;

export default function TopLayout() {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
        <div className={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key={"home"}>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key={"nft-market"}>
            <Link to="/nft-market">NFT市场</Link>
          </Menu.Item>

          <Menu.Item key={"personal"}>
            <Link to="/personal">个人中心</Link>
          </Menu.Item>

          <Menu.Item key={"other"}>
            <Connect />
          </Menu.Item>
        </Menu>
      </Header>
      <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/nft-market/*" element={<NftMarket />} />
          <Route path="/personal/*" element={<Personal />} />
        </Routes>
      </div>
    </Layout>
  );
}
