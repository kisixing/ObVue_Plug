import React, { useState, useEffect } from 'react';
import request from "@lianmed/request";
import {  Table } from 'antd';
import { remote } from "@lianmed/f_types";
import { makeStompService } from "@lianmed/utils/lib/stomp";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';



const columns = [
    {
      title: 'diagnosis',
      dataIndex: 'diagnosis',
    },
    {
      title: 'payment',
      dataIndex: 'payment',
    },
    {
      title: 'paystate',
      dataIndex: 'paystate',
    },
    {
      title: 'paytype',
      dataIndex: 'paytype',
    },
    {
      title: 'prescription',
      dataIndex: 'prescription',
    },
    {
      title: 'result',
      dataIndex: 'result',
    },
    {
      title: 'sn',
      dataIndex: 'sn',
    },
    {
      title: 'state',
      dataIndex: 'state',
    },
    {
      title: 'type',
      dataIndex: 'type',
    },
  ];

export function History() {
    const [dat, setDat] = useState<remote.serviceorders.get[]>([])

    useEffect(() => {
        request.get('/serviceorders?type.equals=CTGAPPLY').then((r: remote.serviceorders.get[]) => {
            setDat(r)

        })
    }, [])
    return (
        <div style={{ height: '100%',padding:12 }}>
            <Table dataSource={dat} columns={columns}/>
        </div>
    );
}




