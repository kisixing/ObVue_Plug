import React, { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { Badge, List, Avatar } from 'antd';
import { remote } from "@lianmed/f_types";
import { Ctg_Layout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import { useI } from "@lianmed/im";
interface IProps {
    data?: IItemData[]
    heigth?: number
    listLayout?: number[]
}
export function L(props: IProps) {
    const { chatMessage, contacts } = useI()
    const init = () => {

    }
    useEffect(() => {
        init()

    }, [])
    return (
        <div style={{ height: '100%' }}>
            <div style={{ background: '#fff', width: 300, height: '100%', padding: 6 }}>
                <List

                    itemLayout="horizontal"
                    dataSource={contacts}
                    renderItem={item => (
                        <List.Item>


                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>{item.name}</span>
                                        <Badge count={item.unread}>
                                        </Badge>

                                    </div>
                                }
                                description={item.latestMessage}
                            />

                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default L



