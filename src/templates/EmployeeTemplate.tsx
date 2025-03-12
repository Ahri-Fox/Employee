import React from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink, RouteProps } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";

type EmployeeTemplateProps = RouteProps & {
  WrappedComponent: React.ComponentType<any>;
};

const EmployeeTemplate: React.FC<EmployeeTemplateProps> = ({ WrappedComponent, ...restProps }) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => console.log(collapsed, type)}>
        <Menu
          className="mt-5"
          theme="dark"
          defaultSelectedKeys={["10"]}
          mode="inline">
          <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
            <Menu.Item key="10" icon={<UserOutlined />}>
              <NavLink to="/listemployee">Employees</NavLink>
            </Menu.Item>
            <Menu.Item key="11" icon={<UploadOutlined />}>
              <NavLink to="/employees/newemployee">Add employee</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header
          style={{
            padding: 0,
            background: theme.useToken().token.colorBgContainer,
          }}
        />
        <Layout.Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: theme.useToken().token.colorBgContainer,
              borderRadius: theme.useToken().token.borderRadiusLG,
            }}>
            <WrappedComponent {...restProps} />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeTemplate;
