import React, { FunctionComponent } from "react";
import { Button } from "antd";
import { UserOutlined,PieChartOutlined } from "@ant-design/icons";
import { ShowPrenatalvisit } from "./ShowPrenatalvisit";
import { ShowAnalyse } from "./ShowAnalyse";
import { ShowReport } from "./ShowReport";
const ToolBar:FunctionComponent =  (props) => {
    return (
        <>
            <ShowPrenatalvisit {...props}/>
            <ShowAnalyse {...props} />
            <ShowReport {...props} />

        </>
    )
}
export default ToolBar