import React, { useState, useEffect, useRef } from 'react';
import request from "@lianmed/request";
import { Badge, List, Avatar, Input, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { remote } from "@lianmed/f_types";
import { Ctg_Layout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import { IContact, IMessage } from '@lianmed/im/lib/hooks/new/types';
import TextArea from 'antd/lib/input/TextArea';
import { Emoji } from "./Emoji";
import { Message  } from "./Message";
interface IProps {

    current: IContact
    currentMessage: IMessage[]
    sendTextMessage: (a: string, b: string) => void
}
export function ChattingPanel(props: IProps) {
    const { current, currentMessage, sendTextMessage } = props
    const [text, setText] = useState('')
    const textArea = useRef<TextArea>(null)
    const div = useRef<HTMLDivElement>(null)
    const init = () => {

    }
    useEffect(() => {
        init()

    }, [])
    useEffect(() => {
        div.current && div.current.scrollTo(0,999)
    }, [currentMessage])
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(248,248,248)', }}>
            {
                current && <div style={{ lineHeight: '50px', height: 50, borderBottom: '1px solid #eee' }}>
                    {current.name}
                </div>
            }
            <div ref={div} style={{ flex: 1, padding: 6, overflowY: current ? 'scroll' : 'unset' }}>
                {
                    currentMessage.map(_ => {
                        return (
                            <Message message={_} key={_.id} />
                        )
                    })
                }
            </div>
            <div style={{ height: 100, position: 'relative' }}>
                <Input.TextArea ref={textArea} value={text} style={{ width: '100%', height: '100%', border: 0 }} onChange={e => setText(e.target.value)} />
                <Button.Group style={{ position: 'absolute', right: 12, bottom: 12 }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            sendTextMessage(current.name, text)
                            setText('')
                            textArea.current && textArea.current.focus()

                        }}
                        disabled={!current}
                    >发送</Button>
                    <Emoji onClick={s => {
                        setText(text + s)
                        textArea.current && textArea.current.focus()
                    }} />
                </Button.Group>
            </div>
        </div>
    );
}




