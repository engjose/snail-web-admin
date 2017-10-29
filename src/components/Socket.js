import React, { Component } from 'react';
import { Button } from 'antd';

var ws;
export default class Socket extends Component {
    render() {
        return (
            <div>
                <Button type='primary' onClick={this.message}>SEND MESSAGE</Button>
                <Button type='primary' onClick={this.close}>CLOSE SOCKET</Button>
            </div>    
        );
    }

    componentDidMount() {
        ws = new WebSocket("ws://localhost:8081/snailsso/echo");
        
        /**
         * open socket lisener
         */
        ws.onopen = () => {
            console.log('connect...');
        };

        /**
         * receive message lisener
         */
        ws.onmessage = (msg) => {
            console.log("receive message:" + msg.data);
        }
    }

    /**
     * click button to send message
     */
    message = () => {
        console.log("send message: Hello Socket");
        ws.send(new Date() + "from client!");
    }

    /**
     * click button to close socket
     */
    close = () => {
        ws.close();
        console.log("close socket");
    }
}
