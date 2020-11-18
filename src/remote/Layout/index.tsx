import request from "@lianmed/request";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Container from "../../../src/components/Container";
import './index.css';

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
        <Container>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: 48, background: '#fff' }}>
                    <Menu
                        // theme="dark"
                        mode="horizontal"
                        onSelect={e => setSelectedKey(e.key)}
                        selectedKeys={[selectedKey]}
                        style={{ lineHeight: '48px' }}
                    >
                        <Menu.Item key="/">
                            <Link to="/"><AppstoreOutlined style={{ marginRight: 4 }} />待诊列表</Link>
                        </Menu.Item>
                        <Menu.Item key="/History">
                            <Link to="/History"><UnorderedListOutlined style={{ marginRight: 4 }} />判图历史</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="3">nav 3</Menu.Item> */}
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ height: 'calc(100vh - 48px)', marginTop: 48 }}>

                    {ok && props.children}
                </Content>
            </Layout>

        </Container>
    );
})





export default App;
