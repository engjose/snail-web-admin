import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from '../App';
import HomeSider from '../components/HomeSider';
import Test from "../components/Test"

export default class CRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={App} />
                <Route path={'/silder'} components={HomeSider}>
                    <Route path={'/test'} components={Test} />
                </Route>
            </Router>
        )
    }
}