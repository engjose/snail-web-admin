import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from '../App';
import HomeSider from '../components/HomeSider';
import Test from "../components/Test"
import EmployeeList from "../components/employee/EmployeeList";

export default class CRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={App} />
                <Route path={'/silder'} components={HomeSider}>
                    <Route path={'/test'} components={Test} />
                    <Route path={'/employees'} components={EmployeeList} />
                </Route>
            </Router>
        )
    }
}