import {
  BorderOuterOutlined,
  ProfileOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Dashboard",
    icon: <BorderOuterOutlined />,
  },
  {
    key: "2",
    label: "User Management",
    children: [
      {
        key: "2.1",
        label: "User List",
      },
    ],
    icon: <UserSwitchOutlined />,
  },
  {
    key: "3",
    label: "Profile",
    icon: <ProfileOutlined />,
  },
];

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            padding: '1rem',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="demo-logo-vertical"
        >
          <h2>PH University</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
