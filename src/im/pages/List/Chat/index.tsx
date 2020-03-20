import React, { useState, useEffect } from 'react';

import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import { useI } from "@lianmed/im";
import { Contact } from './Contact'
import { Info } from './Info'
import { Message } from './Message'
interface IProps {
    data?: IItemData[]
    heigth?: number
    listLayout?: number[]
    
}
export function Chat(props: IProps) {
    const { chatMessage, contacts, current, currentMessage, setCurrentId, sendTextMessage } = useI()
    const init = () => {

    }
    useEffect(() => {
        init()

    }, [])
    return (
        < >
            <Contact contacts={contacts} setCurrentId={setCurrentId} current={current} />
            <Message current={current} currentMessage={currentMessage} sendTextMessage={sendTextMessage} />
            <Info />
        </>
    );
}




