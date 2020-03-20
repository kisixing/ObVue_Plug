import React from 'react'
import { Switch, Route, HashRouter } from "react-router-dom";

import Layout from '../Layout'
import { L } from "../pages/List";
export const Router: React.FC = props => {
    return <>
        <HashRouter >
            <Layout>
                <Switch>
                    <Route path="/" >
                        <L />
                    </Route>
    
                </Switch>
            </Layout>
        </HashRouter>
    </>
}