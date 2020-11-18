import React, { FC } from 'react';
import { useMessage } from '../../../src/hooks/message';
import './index.css';

const App: FC<{}> = function (props) {

    const { data } = useMessage()
    return (
        <>
            {props.children}
        </>
    );
}





export default App;
