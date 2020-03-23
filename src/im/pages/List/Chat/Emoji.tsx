import { SmileOutlined } from '@ant-design/icons';
import { IContact, IMessage } from '@lianmed/im/lib/hooks/new/types';
import { Button, Dropdown } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useRef, useState } from 'react';
import { emojiMap } from "@lianmed/im";
import styled from "styled-components";

const Wrapper = styled.div`
display:flex;
flex-wrap: wrap;
width:220px;
background:#fff;
.emoji {
    cursor:pointer;
}
.emoji:hover {
    background:#eee;
}
`
interface IProps {

    onClick: (key: string) => void
}
export function Emoji(props: IProps) {
    const { onClick } = props
    const [v, setV] = useState(false)
    const ref = useRef<TextArea>(null)
    const overlay = (
        <Wrapper >
            {
                Object.entries(emojiMap).map(([k, v]) => {
                    return (
                        <img src={v} width="24" height="24" key={k} className="emoji" onClick={() => {
                            onClick(k)
                        }} />
                    )
                })
            }
        </Wrapper>
    )
    return (
        <Dropdown overlay={overlay} >
            <Button icon={<SmileOutlined />} disabled={false} />
        </Dropdown>

    );
}




