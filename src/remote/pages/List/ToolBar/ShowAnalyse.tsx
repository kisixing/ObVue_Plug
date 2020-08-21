import React, { FunctionComponent, useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import { IPropsWithData } from "./interface";
import TextArea from "antd/lib/input/TextArea";
import { Ctg_Analyse as CtgAnalyse } from "@lianmed/pages";
import { event } from "@lianmed/utils";
import { ANALYSE_SUCCESS_TYPE } from "@lianmed/pages/lib/Ctg/Analyse";
import request from '@lianmed/request'
export const ShowAnalyse: FunctionComponent<IPropsWithData> = (props) => {

    const { itemData } = props
    const data = itemData && itemData.data
    const prenatalvisit = itemData && itemData.prenatalvisit
    const pregnancy = itemData && itemData.pregnancy
    const id = itemData && itemData.id
    const docid = itemData && itemData.data?.docid
    const name = pregnancy && pregnancy.name
    const age = pregnancy && pregnancy.age
    const telephone = pregnancy && pregnancy.telephone
    const GP = pregnancy && pregnancy.GP
    const gestationalWeek = prenatalvisit && prenatalvisit.gestationalWeek
    const startdate = prenatalvisit && prenatalvisit.visitDate
    // const fetalcount
    // const age = pregnancy && pregnancy.age
    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)
    const print = () => {
        const prefix = request.configure.prefix
        const filePath = `${prefix}/ctg-exams-pdfurl/${docid}`
        console.log('print', filePath)
        if (electron) {
            require('electron').ipcRenderer.send('printWindow', filePath)
        } else {
            window.open(filePath)
        }
    }
    const spanStyle = {marginRight:8}
    const Title = () => {
        return (
            <div>
                <span style={spanStyle}>姓名：{name}</span>
                <span style={spanStyle}>年龄：{age}</span>
                <span style={spanStyle}>孕周：{gestationalWeek}</span>
                <span style={spanStyle}>手机：{telephone}</span>
                <span style={spanStyle}>G/P：{GP}</span>
                <span style={spanStyle}>docid：{data && data.docid}</span>
            </div>
        )
    }
    useEffect(() => {
        const cb = (_id: string) => {
            if (_id !== id) return
            setVisible(false)

        }
        event.on(ANALYSE_SUCCESS_TYPE, cb)
        return () => {
            event.off(ANALYSE_SUCCESS_TYPE, cb)
        }
    }, [])
    return (
        <>
            <Button type="link" icon={<UserOutlined />} onClick={toggle}>判图</Button>
            <Modal maskClosable={false} getContainer={false} footer={null} title={<Title />} destroyOnClose width='98vw' style={{ minWidth: 1000 }} centered bodyStyle={{ width: '100%', height: '80vh' }} visible={visible} onCancel={toggle}>
                <CtgAnalyse name={name} startdate={startdate} fetalcount={0}  inpatientNO={''} age={age}  gestationalWeek={gestationalWeek} onDownload={print} docid={data && data.docid} id={id} type="remote" />
            </Modal>
        </>
    )
}
