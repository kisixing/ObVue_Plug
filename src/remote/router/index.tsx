import React from 'react'
import { Switch, Route, HashRouter } from "react-router-dom";

import Layout from '../Layout'
import { List } from "../pages/List";
import { History } from "../pages/History";
export const Router: React.FC = props => {
    return <>
        <HashRouter >
            <Layout>
                <Switch>
                    <Route path="/" exact >
                        <List showPage={true}/>
                    </Route>
                    <Route path="/History">
                        <History />
                    </Route>
                </Switch>
            </Layout>
        </HashRouter>
    </>
}