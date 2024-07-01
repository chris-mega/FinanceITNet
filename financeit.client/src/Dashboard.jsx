import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Recurring from "./Recurring";
import History from "./History";
import Overview from "./Overview";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    title: label,
  };
}

const items = [
  getItem("Overview", "1", <PieChartOutlined />),
  getItem("Expenses", "sub1", <FileOutlined />, [
    getItem("Recurring", "2"),
    getItem("History", "3"),
  ]),
  getItem("Income", "sub2", <UserOutlined />, [
    getItem("Work", "4"),
    getItem("Delivery", "5"),
    getItem("Meat", "6"),
  ]),
];

const pages = [<Overview />, <Recurring />, <History />];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSelect = (item) => {
    setSelectedPage(item);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={onSelect}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {selectedPage ? selectedPage.item.props.title : items[0].label}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {selectedPage ? pages[selectedPage.key - 1] : pages[0]}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
