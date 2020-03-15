import React, { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { Col, Row, Table } from 'antd';
import { remote } from "@lianmed/f_types";
import { makeStompService } from "@lianmed/utils/lib/stomp";
import { Ctg_Layout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import ToolBar from "./ToolBar/index";



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
    const [items, setItems] = useState<IItemData[]>([])
    const [contentHeight, setcontentHeight] = useState((document.querySelector('main') || { clientHeight: 0 }).clientHeight)

    useEffect(() => {
        request.get('/serviceorders?type.equals=CTGAPPLY').then((r: remote.serviceorders.get[]) => {
            setDat(r)
            Promise.all(r.map(_ => {
                const note = _.prenatalvisit.ctgexam.note
                return request.get(`/ctg-exams-data/${note}`).catch(() => { })
            })).then((d: any) => {

                const _items = r.map((_, index) => {
                    const note = _.prenatalvisit.ctgexam.note

                    const data: IItemData = {
                        id: _.id,
                        bedname: '',
                        data: {
                            ...d[index],
                            pregnancy: _.pregnancy,
                            docid: note
                        },
                        unitId: '',
                        prenatalvisit: _.prenatalvisit,
                        pregnancy: _.pregnancy
                    }
                    return data
                })
                setItems(
                    _items
                )

            })
        })

        const data = makeStompService().subscribe((a: any) => {
            console.log('ggg', a)
        })
    }, [])
    return (
        <div style={{ height: '100%',padding:12 }}>
            <Table dataSource={dat} columns={columns}/>
        </div>
    );
}




