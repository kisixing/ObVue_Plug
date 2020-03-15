import React, { FunctionComponent } from "react";
import { Button } from "antd";
import { UserOutlined,PieChartOutlined } from "@ant-design/icons";
const ToolBar:FunctionComponent =  (props) => {
    console.log(props)
    return (
        <>
            <Button type="link" icon={<UserOutlined />}>档案</Button>
            <Button type="link" icon={<PieChartOutlined />}>诊断</Button>
        </>
    )
}
export default ToolBar