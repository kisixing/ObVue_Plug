import React, { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { Badge, List, Avatar } from 'antd';
import { remote } from "@lianmed/f_types";
import { Ctg_Layout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
interface IProps {
    data?: IItemData[]
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
        <div style={{ width: 400,borderLeft:'1px solid #eee' }}>
            111
        </div>
    );
}




