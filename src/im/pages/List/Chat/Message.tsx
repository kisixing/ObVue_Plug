import React, { useState, useEffect, useRef } from 'react';
import request from "@lianmed/request";
import { Badge, List, Avatar, Input, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { remote } from "@lianmed/f_types";
import { Ctg_Layout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import { IContact, IMessage } from '@lianmed/im/lib/hooks/new/types';
import TextArea from 'antd/lib/input/TextArea';
interface IProps {

    current: IContact
    currentMessage: IMessage[]
    sendTextMessage: (a: string, b: string) => void
}
export function Message(props: IProps) {
    const { current, currentMessage, sendTextMessage } = props
    const [text, setText] = useState('')
    const ref = useRef<TextArea>(null)
    const init = () => {

    }
    useEffect(() => {
        init()

    }, [])
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(248,248,248)', }}>
            {
                current && <div style={{ lineHeight: '50px', height: 50, borderBottom: '1px solid #eee' }}>
                    {current.name}
                </div>
            }
            <div style={{ flex: 1, padding: 6, overflowY: current ? 'scroll' : 'unset' }}>
                {
                    currentMessage.map(_ => {
                        return (
                            <>
                                {
                                    !!_.isHead && <div style={{ clear: 'both', textAlign: 'center' }}>{_.timestamp}</div>
                                }
                                <div key={_.id} style={{ padding: 4, lineHeight: '28px', margin: '2px 0', float: _.bySelf ? 'right' : 'left', clear: 'both', background: _.bySelf ? 'skyblue' : '#fff', color: _.bySelf ? '#fff' : '#333' }}>
                                    {_.msg}
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div style={{ height: 100, position: 'relative' }}>
                <Input.TextArea ref={ref} value={text} style={{ width: '100%', height: '100%', border: 0 }} onChange={e => setText(e.target.value)} />
                <Button.Group style={{ position: 'absolute', right: 12, bottom: 12 }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            sendTextMessage(current.name, text)
                            setText('')
                            ref.current && ref.current.focus()

                        }}
                        disabled={!current}
                    >发送</Button>
                    <Button icon={<SmileOutlined />} disabled={!current} />
                </Button.Group>
            </div>
        </div>
    );
}




