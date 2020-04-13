import { useI } from "@lianmed/im";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import React, { useEffect } from 'react';
import { ChattingPanel } from './ChattingPanel';
import { Contact } from './Contact';
import { Info } from './Info';

interface IProps {
    data?: IItemData[]
    heigth?: number
    listLayout?: number[]

}
export function Chat(props: IProps) {
    //@ts-ignore
    const { chatMessage, contacts, current, currentMessage, setCurrentId, sendTextMessage } = useI(window.stomp_url)

    const init = () => {

    }
    useEffect(() => {
        init()
    }, [])
    return (
        < >
            <Contact contacts={contacts} setCurrentId={setCurrentId} current={current} />
            <ChattingPanel current={current} currentMessage={currentMessage} sendTextMessage={sendTextMessage} />
            <Info />
        </>
    );
}




