import React, { useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import request from "@lianmed/request";
import 'antd/dist/antd.css'
const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false)
  const [name, setName] = useState('im')
  const [ok, setOk] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)

  };
  useEffect(() => {
    request.config({ prefix: 'transfer.lian-med.com:9987/api' })
    request.authenticate({ password: 'admin', username: 'admin' }).then(r => setOk(true))
  }, [])
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo" />
        <Menu mode="inline" selectedKeys={[name]} onSelect={e => setName(e.key)}>
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
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '12px',
            minHeight: 280,
            background: '#fff'
          }}
        >
          {ok && <iframe frameBorder="0" height="100%" width="100%" src={request.configToLocation(`http://localhost:3000/${name}/index.html`, { stomp_url: 'transfer.lian-med.com:9987' })} />}
        </Content>
      </Layout>
    </Layout>
  );
}