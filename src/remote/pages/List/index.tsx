import React, { useState, useEffect } from 'react';
import request from "@lianmed/request";
import { Col, Pagination } from 'antd';
import { remote } from "@lianmed/f_types";
import { Ctg_Layout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import ToolBar from "./ToolBar/index";
import { event } from '@lianmed/utils';
import { ANALYSE_SUCCESS_TYPE } from '@lianmed/pages/lib/Ctg/Analyse';
interface IProps {
    data?: IItemData[]
    heigth?: number
    listLayout?: number[]
}
export function List(props: IProps) {
    const { data = [], listLayout = [2, 2], heigth = 0 } = props
    const [dat, setDat] = useState<remote.serviceorders.get[]>([])
    const [items, setItems] = useState<IItemData[]>(data)
    const [contentHeight, setcontentHeight] = useState(heigth || (document.querySelector('main') || { clientHeight: 0 }).clientHeight)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const init = () => {
        if (data.length) return
        setLoading(true)
        request.get(`/serviceorders?type.equals=CTGAPPLY&diagnosis.specified=false&size=4&page=${page}`).then((r: remote.serviceorders.get[]) => {
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
                .finally(() => setLoading(false))
        })
    }
    useEffect(() => {
        init()
        event.on(ANALYSE_SUCCESS_TYPE, init)
        return () => {
            event.off(ANALYSE_SUCCESS_TYPE, init)
        }
    }, [page])
    return (
        <div style={{ height: '100%' }}>
            <div style={{ height: 'calc(100% - 50px)' }}>
                <Ctg_Layout loading={loading} RenderIn={ToolBar} items={items} contentHeight={contentHeight} listLayout={listLayout} />
            </div>
            <Pagination
                style={{ margin: 9, float: 'right' }}
                onChange={e => setPage(e + 1)}
                total={dat.length}
            />
        </div>
    );
}




