import React, { useEffect, useState } from 'react';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { ipcRenderer, remote } from "electron";
import request, { config } from "@lianmed/request";
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
    // Hooks.useLogin(`http://${`transfer.lian-med.com:9987`}/api`, { username: 'admin', password: 'admin' }, () => {
    //     setOk(true)
    // })
    // const s = 'transfer.lian-med.com'
    const s = '192.168.123.56'
    const n = location.slice(1)
    useEffect(() => {
        request.authenticate({ username: n, password: n }, { prefix: `http://${s}:9987/api` }).then(() => {
            setOk(true)
        })
    }, [])

    return (
        <Layout>

            <Content className="site-layout" style={{ height: 'calc(100vh)' }}>

                {ok && props.children}
            </Content>
        </Layout>
    );
})





export default App;
