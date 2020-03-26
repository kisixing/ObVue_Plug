import React, { useEffect, useState } from 'react';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { ipcRenderer, remote } from "electron";
import request from "@lianmed/request";
import { Link } from 'react-router-dom';
import { Hooks } from "@lianmed/utils";
import { Switch, Route, HashRouter, withRouter } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const App = withRouter(function (props) {
    const location = props.location.pathname
    const [selectedKey, setSelectedKey] = useState(location)
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
    useEffect(() => {
        // request.authenticate({ username: 'admin', password: 'admin' }, { prefix: `http://${s}:9987/api` }).then(() => {
        //     setOk(true)
        // })
        request.configFromLocation()
        setOk(true)
    }, [])

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onSelect={e => setSelectedKey(e.key)}
                    selectedKeys={[selectedKey]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/"><Link to="/">待诊列表</Link></Menu.Item>
                    <Menu.Item key="/History"><Link to="/History">判图历史</Link></Menu.Item>
                    {/* <Menu.Item key="3">nav 3</Menu.Item> */}
                </Menu>
            </Header>
            <Content className="site-layout" style={{ height: 'calc(100vh - 64px)', marginTop: 64 }}>

                {ok && props.children}
            </Content>
        </Layout>
    );
})





export default App;
