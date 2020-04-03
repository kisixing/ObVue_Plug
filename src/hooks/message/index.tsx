import { useState, useEffect } from "react";
interface IData {
    [x: string]: any
}
console.log('window.electron', window.electron)
export const useMessage = () => {
    const [data, setData] = useState<IData>()
    useEffect(() => {
        window.addEventListener('message', ({ data }: IData) => {
            console.log('message w', data)
        })
        if (window.electron) {
            const { ipcRenderer, remote } = require('electron')
            ipcRenderer.on('message', (e, { data }: IData) => {
                console.log('message e', data)
            })
            const wins = remote.getGlobal('windows')
            console.log('send to main')
            wins.main.send('load')
        }
        return () => {
        }
    }, [])

    return { data }
}