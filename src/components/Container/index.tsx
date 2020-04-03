import React, { useEffect, useState, FC } from 'react';
import Layout from 'antd/lib/layout'
import './index.css';
import { useMessage } from '../../../src/hooks/message';

const App: FC<{}> = function (props) {

    const { data } = useMessage()
    return (
        <>
            {props.children}
        </>
    );
}





export default App;
