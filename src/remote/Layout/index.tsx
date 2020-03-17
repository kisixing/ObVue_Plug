import React, { useEffect, useState } from 'react';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { ipcRenderer, remote } from "electron";
import { config } from "@lianmed/request";
import { Link } from 'react-router-dom';
import { Hooks } from "@lianmed/utils";
const { Header, Content, Footer } = Layout;
function App(props: any) {
    const [ok, setOk] = useState(false)
    // useEffect(() => {
    //     const main = remote.getGlobal('windows').main
    //     ipcRenderer.on('token', (e, c) => {
    //         console.log('config', c, '11')

    //         config(c)
    //         setOk(true)
    //     })
    //     !configed && main.send('getToken')
    // }, [])
    Hooks.useLogin(`http://${`transfer.lian-med.com:9987`}/api`, { username: 'admin', password: 'admin' }, () => {
        setOk(true)
    })
    console.log('zz',require('@lianmed/utils'))

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to="/">待诊列表</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/History">判图历史</Link></Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ height: 'calc(100vh - 64px)', marginTop: 64 }}>

                {ok && props.children}
            </Content>
        </Layout>
    );
}





export default App;
