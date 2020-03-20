import React from 'react'
import { Tabs } from 'antd';
import { MessageOutlined, AndroidOutlined } from '@ant-design/icons';
import { Chat } from "./Chat/index";
const { TabPane } = Tabs;

export const L = () => (
    <Tabs defaultActiveKey="1" style={{ height: '100%', background: '#fff', padding: 12, borderRadius: 2, overflowY: 'scroll',  }}>
        <TabPane style={{ height: 'calc(100vh - 86px)', display: 'flex',  border:'1px solid #eee'}}

            tab={
                <span>
                    <MessageOutlined />
                    <span>待回复</span>
                </span>
            }
            key="1"
        >
            <Chat />
        </TabPane>
        <TabPane
            tab={
                <span>
                    <AndroidOutlined />
                    <span>待接入</span>
                </span>
            }
            key="2"
        >
            <span>Tab 2</span>
        </TabPane>
    </Tabs>
);