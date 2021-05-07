import { IContact } from '@lianmed/im/lib/hooks/new/types';
import { Avatar, Badge, List } from 'antd';
import React, { useEffect } from 'react';
interface IProps {

    contacts: IContact[]
    current: IContact

    setCurrentId: (id: string) => void
}
export function Contact(props: IProps) {
    const { contacts, setCurrentId, current } = props
    const init = () => {

    }
    useEffect(() => {
        init()

    }, [])
    return (
        <div style={{ width: 240, height: '100%', borderRight: '1px solid #eee' }}>
            <List

                itemLayout="horizontal"
                dataSource={contacts}
                renderItem={item => {
                    const isActive = item.name === (current && current.name)
                    return (
                        <List.Item style={{ paddingLeft: 4, transition: 'all .5s', cursor: isActive ? 'default' : 'pointer', borderRight: '4px solid', background: isActive ? 'rgb(236,236,236)' : '', borderRightColor: isActive ? '#1890ff' : 'transparent' }} onClick={() => {
                            setCurrentId(item.name)
                        }}>


                            <List.Item.Meta
                                style={{}}
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: 4 }}>
                                        <span>{item.name}</span>
                                        <Badge count={item.unread} />
                                    </div>
                                }
                                description={<div style={{ width: 160, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.latestMessage}</div>}
                            />

                        </List.Item>
                    )
                }}
            />
        </div>
    );
}




