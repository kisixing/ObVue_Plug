import React, { useState, useEffect, useRef } from 'react';
import request from "@lianmed/request";
import { Col, Pagination } from 'antd';
import { remote } from "@lianmed/f_types";
import { Ctg_Layout as CtgLayout } from "@lianmed/pages";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';
import ToolBar from "./ToolBar/index";
import { event } from '@lianmed/utils';
import { ANALYSE_SUCCESS_TYPE } from '@lianmed/pages/lib/Ctg/Analyse';
interface IProps {
    data?: IItemData[]
    heigth?: number
    listLayout?: number[]
    showPage?: boolean
}
export function List(props: IProps) {
    const { data = [], listLayout = [2, 2], heigth = 0, showPage = false } = props
    const [dat, setDat] = useState<remote.serviceorders.get[]>([])
    const [items, setItems] = useState<IItemData[]>(data)
    const [size, setSize] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const [contentHeight, setcontentHeight] = useState(0)
    useEffect(() => {
        const h = ref.current && ref.current.getBoundingClientRect()
        h && setcontentHeight(heigth || h.height)
    }, [])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)

    const init = () => {
        if (data.length) return
        setLoading(true)
        request.get('/serviceorders/count?type.equals=CTGAPPLY&diagnosis.specified=false').then((n) => {
            setSize(n)
        })
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
                        _.pregnancy.gestationalWeek = _.prenatalvisit.gestationalWeek
                        _.pregnancy.GP = `${_.pregnancy.gravidity}/${_.pregnancy.parity}`
                        const data: IItemData = {
                            id: _.id,
                            bedname: '',
                            data: {
                                ...d[index],
                                pregnancy: _.pregnancy,
                                docid: note,
                                selectBarHidden: true
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
            <div style={{ height: 'calc(100% - 50px)' }} ref={ref}>
                <CtgLayout loading={loading} RenderIn={ToolBar} items={items} contentHeight={contentHeight} listLayout={listLayout} />
            </div>
            {
                showPage && <Pagination
                    style={{ marginBottom: 9, float: 'right' }}
                    onChange={e => setPage(e - 1)}
                    current={page + 1}
                    pageSize={4}
                    total={size}
                />
            }
        </div>
    );
}




