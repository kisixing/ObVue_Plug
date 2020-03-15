import React, { FunctionComponent } from "react";
import { Button } from "antd";
import { UserOutlined,PieChartOutlined } from "@ant-design/icons";
import { ShowPrenatalvisit } from "./ShowPrenatalvisit";
import { ShowAnalyse } from "./ShowAnalyse";
const ToolBar:FunctionComponent =  (props) => {
    return (
        <>
            <ShowPrenatalvisit {...props}/>
            <ShowAnalyse {...props} />
        </>
    )
}
export default ToolBar