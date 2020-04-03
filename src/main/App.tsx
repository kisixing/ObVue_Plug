import React, { useEffect, useState,useRef } from "react";
import { Menu,Layout } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import request from "@lianmed/request";
import 'antd/dist/antd.css'
const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false)
  const [name, setName] = useState('')
  const [ok, setOk] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  };
  const i = useRef<HTMLIFrameElement>(null)
  // eslint-disable-next-line no-restricted-globals
  const url = new URL(location.href) // token, prefix
  const token = url.searchParams.get('token') as string
  const prefix = url.searchParams.get('prefix')
  const public_url = url.searchParams.get('public_url')
  useEffect(() => {
    console.log(name,i)
  }, [name,i])
  useEffect(() => {

    request.config({ prefix: prefix || 'transfer.lian-med.com:9987/api', Authorization: token })
    token ? (setOk(true)) : request.authenticate({ password: 'admin', username: 'admin' }).then(r => setOk(true))
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

        <Content
          className="site-layout-background"
          style={{
            margin: '12px',
            minHeight: 280,
            background: '#fff'
          }}
        >
          {ok && name && <iframe ref={i} title="zz" frameBorder="0" height="100%" width="100%" src={request.configToLocation(`http://${public_url || 'localhost:3000'}/${name}/index.html`, { stomp_url: 'transfer.lian-med.com:9987' })} />}
        </Content>
      </Layout>
    </Layout>
  );
}