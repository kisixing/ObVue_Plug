import { emojiMap } from "@lianmed/im";
import { IMessage } from '@lianmed/im/lib/hooks/new/types';
import TextArea from 'antd/lib/input/TextArea';
import React, { useRef } from 'react';

interface IProps {

    message: IMessage
}
type t = typeof emojiMap
type g = keyof t
export function Message(props: IProps) {
    const { message } = props
    const ref = useRef<TextArea>(null)
    const m = message.msg.replace(/\[.*?\]/g, (a) => (
        `<img src="${emojiMap[a as g]}" />`
    ))
    return (
        <div >
            {
                !!message.isHead && <div style={{ clear: 'both', textAlign: 'center' }}>{new Date(message.timestamp || 0).toLocaleString()}</div>
            }
            <div style={{ padding: 4, lineHeight: '28px', margin: '2px 0', float: message.bySelf ? 'right' : 'left', clear: 'both', background: message.bySelf ? 'skyblue' : '#fff', color: message.bySelf ? '#fff' : '#333' }}>
                <span dangerouslySetInnerHTML={{ __html: m }}></span>
            </div>
        </div>
    );
}




