import React, { FunctionComponent, useState } from "react";
import { Button, Modal, Form } from "antd";
import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import { IPropsWithData } from "./interface";
import TextArea from "antd/lib/input/TextArea";
export const ShowPrenatalvisit: FunctionComponent<IPropsWithData> = (props) => {
    const { itemData } = props
    const data = itemData && itemData.data
    const pregnancy = itemData && itemData.pregnancy
    const prenatalvisit = itemData && itemData.prenatalvisit
    const historyStr = (prenatalvisit && prenatalvisit.ctgexam.diagnosis) || '[]'
    const history: { diagnosistxt: string }[] = JSON.parse(historyStr)
    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)
    return (
        <>
            <Button type="link" icon={<UserOutlined />} onClick={toggle}>档案</Button>
            <Modal getContainer={false} visible={visible} onCancel={toggle} footer={null} destroyOnClose>
                <Form>
                    <Form.Item label="姓名">
                        <span>{pregnancy && pregnancy.name}</span>
                    </Form.Item>
                    <Form.Item label="年龄">
                        <span>{pregnancy && pregnancy.age}</span>
                    </Form.Item>
                    <Form.Item label="G/P">
                        <span>{pregnancy && pregnancy.GP}</span>
                    </Form.Item>
                    <Form.Item label="孕周">
                        <span>{prenatalvisit && prenatalvisit.gestationalWeek}</span>
                    </Form.Item>
                    <Form.Item label="历史诊断">
                        {
                            Array.isArray(history) ? history.map((_, i) => (
                                <div key={i.toString()} style={{ lineHeight: '30px' }}>
                                    <span>{i + 1}、</span>
                                    <span>{_.diagnosistxt}</span>
                                </div>
                            )) : null
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
