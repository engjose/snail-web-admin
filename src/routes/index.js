import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from '../App';

export default class CRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={App} />
            </Router>
        )
    }
}