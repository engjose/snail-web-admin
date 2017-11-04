import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from '../App';
import HomeSider from '../components/HomeSider';

//empoyees
import EmployeeList from "../components/employee/EmployeeList";
import EmployeeAdd from "../components/employee/EmployeeAdd";

//articles
import ArticleAdd from "../components/article/ArticleAdd"

// common components
import Socket from "../components/Socket"
import HtmlEditor from "../components/commonComponents/HtmlEditor";
import AutoSwitchBanner from "../components/commonComponents/AutoSwitchBanner";
import MarkDownEditor from "../components/commonComponents/MarkDownEditor";
import SlateEditor from "../components/commonComponents/SlateEditor";

export default class CRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={App} />
                <Route path={'/home'} components={HomeSider}>
                    <Route path={'/socket'} components={Socket} />
                    <Route path={'/htmlEditor'} components={HtmlEditor} /> 
                    <Route path={'/markDownEditor'} components={MarkDownEditor} /> 
                    <Route path={'/slateEditor'} components={SlateEditor} /> 

                    <Route path={'/employees'} components={EmployeeList} />
                    <Route path={'/employees/add'} components={EmployeeAdd} />
                    <Route path={'/autoBanner'} components={AutoSwitchBanner} />

                    <Route path={'/articles/add'} components={ArticleAdd} />
                </Route>
            </Router>
        )
    }
}