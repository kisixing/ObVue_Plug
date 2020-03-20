import React from "react";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css'
const { Header, Sider, Content } = Layout;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    name: 'im'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme="light">
          <div className="logo" />
          <Menu mode="inline" selectedKeys={[this.state.name]} onSelect={e => this.setState({ name: e.key })}>
            {
              (JSON.parse(process.env.REACT_APP_ENTRY as string) as string[])
              .filter(_ => _ !== 'main')
              .map(_ => {
                return (
                  <Menu.Item key={_}>
                    <UserOutlined />
                    <span>{_}</span>
                  </Menu.Item>
                )
              })
            }

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '12px',
              minHeight: 280,
              background:'#fff'
            }}
          >
            <iframe frameBorder="0" height="100%" width="100%" src={`http://localhost:3000/${this.state.name}/index.html`} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}