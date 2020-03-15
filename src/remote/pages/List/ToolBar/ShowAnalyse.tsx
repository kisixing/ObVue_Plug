import React, { FunctionComponent, useState } from "react";
import { Button, Modal } from "antd";
import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import { IPropsWithData } from "./interface";
import TextArea from "antd/lib/input/TextArea";
import { Ctg_Analyse } from "@lianmed/pages";
export const ShowAnalyse: FunctionComponent<IPropsWithData> = (props) => {
    const { itemData } = props
    const data = itemData && itemData.data
    const pregnancy = itemData && itemData.pregnancy
    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)
    const Title = () => {
        return (
            <div>
                <span>姓名：{pregnancy && pregnancy.name}</span>
                <span>docid：{data && data.docid}</span>
            </div>
        )
    }
    return (
        <>
            <Button type="link" icon={<UserOutlined />} onClick={toggle}>分析</Button>
            <Modal getContainer={false} footer={null} title={<Title />} width="80vw" centered bodyStyle={{ width: '80vw', height: '80vh' }} visible={visible} onCancel={toggle}>
                <Ctg_Analyse docid={data && data.docid} />
            </Modal>
        </>
    )
}
