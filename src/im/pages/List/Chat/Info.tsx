import { ICtgLayoutItem } from '@lianmed/pages';
import React, { useEffect } from 'react';
interface IProps {
    data?: ICtgLayoutItem[]
    heigth?: number
    listLayout?: number[]
}
export function Info(props: IProps) {
    const init = () => {

    }
    useEffect(() => {
        init()

    }, [])
    return (
        <div style={{ width: 400, borderLeft: '1px solid #eee' }}>
            111
        </div>
    );
}




