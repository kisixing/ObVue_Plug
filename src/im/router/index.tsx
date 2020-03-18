import React from 'react'
import { Switch, Route, HashRouter } from "react-router-dom";

import Layout from '../Layout'
import { L } from "../pages/List";
import { History } from "../pages/History";
export const Router: React.FC = props => {
    return <>
        <HashRouter >
            <Layout>
                <Switch>
                    <Route path="/" exact >
                        <L />
                    </Route>
                    {/* <Route path="/History">
                        <History />
                    </Route> */}
                </Switch>
            </Layout>
        </HashRouter>
    </>
}