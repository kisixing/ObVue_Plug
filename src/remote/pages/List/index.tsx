import React, { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { Col, Row } from 'antd';
import { remote } from "@lianmed/f_types";
import { makeStompService } from "@lianmed/utils/lib/stomp";
import { Ctg_Layout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import ToolBar from "./ToolBar/index";
export function List() {
    const [dat, setDat] = useState<remote.serviceorders.get[]>([])
    const [items, setItems] = useState<IItemData[]>([])
    const [contentHeight, setcontentHeight] = useState((document.querySelector('main') || { clientHeight: 0 }).clientHeight)

    useEffect(() => {
        request.get('/serviceorders?type.equals=CTGAPPLY').then((r: remote.serviceorders.get[]) => {
            setDat(r)
            Promise.all(r.map(_ => {
                const note = _.prenatalvisit.ctgexam.note
                return request.get(`/ctg-exams-data/${note}`).catch(() => null)
            }))
                .then(_ => _.filter(_ => !!_))
                .then((d: any) => {

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

        const data = makeStompService('')
        console.log('data', data)
        // data.
        data.subscribe('/topic/ordernotify')
        data.receive((aa: any) => {
            console.log('dddd', aa)
        })
    }, [])
    return (
        <div style={{ height: '100%' }}>
            <Ctg_Layout RenderIn={ToolBar} items={items} contentHeight={contentHeight} listLayout={[2, 2]} />
        </div>
    );
}




