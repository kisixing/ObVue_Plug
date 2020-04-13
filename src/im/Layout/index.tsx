import request from "@lianmed/request";
import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import Container from "../../../src/components/Container";
import './index.css';

const { Header, Content, Footer } = Layout;
// export const s = 'transfer.lian-med.com'
export const s = 'transfer.lian-med.com'

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
    useEffect(() => {
        // request.authenticate({ username: 'admin', password: 'admin' }, { prefix: `http://${s}:9987/api` }).then(() => {
        //     setOk(true)
        // })
        const d = request.configFromLocation()
        const { stomp_url, prefix = stomp_url } = d as { stomp_url: string, prefix: string }
        try {
            // @ts-ignore
            window.stomp_url = new URL(prefix.includes('://')?prefix:`http://${prefix}`).host
        } catch (e) {
            console.error(e)
        }
        setOk(true)
    }, [])

    return (
        <Container>

            <Layout>

                <Content className="site-layout" style={{ height: 'calc(100vh)' }}>

                    {ok && props.children}
                </Content>
            </Layout>
        </Container>
    );
})





export default App;
