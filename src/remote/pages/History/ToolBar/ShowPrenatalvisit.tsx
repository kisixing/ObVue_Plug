import React, { FunctionComponent, useState } from "react";
import { Button, Modal } from "antd";
import { UserOutlined, PieChartOutlined } from "@ant-design/icons";
import { IPropsWithData } from "./interface";
import TextArea from "antd/lib/input/TextArea";
export const ShowPrenatalvisit: FunctionComponent<IPropsWithData> = (props) => {
    const { itemData } = props
    console.log('zz',itemData)
    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)
    return (
        <>
            <Button type="link" icon={<UserOutlined />} onClick={toggle}>档案</Button>
            <Modal getContainer={false} visible={visible} onCancel={toggle}>
                <TextArea autoSize value={ JSON.stringify(itemData && itemData.prenatalvisit, null, 2)}>

                </TextArea>
            </Modal>
        </>
    )
}
