import React, {Component} from 'react';
import {
    Icon,
    Upload,
    notification,
} from 'antd';
import axios from 'axios';
import { $post } from '../../axios/HttpAxios';

export default class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploadListSize: 0,
        }
    }

    render() {
        /**
         * upload img attributes
         */
        const uploadProps = {
            action: ``,
            onChange: this.handleChange,
            // onRemove: this.removeFile,
            beforeUpload: this.beforeUpload,
            // onPreview: this.download,
            multiple: false,
        };

        const {btnName} = this.props;

        return (
            <div>
                <Upload {...uploadProps} fileList={this.state.fileList}>
                    <div className="upload_head_btn">{btnName}</div>
                </Upload>
            </div>
        );
    }

    /**
     * handle uploadComponent
     */
    handleChange = (info) => {
        this.asynchronyUpload(info);
    };

    /**
     * asyn upload img and set url
     */
    asynchronyUpload = (info) => {
        let file = info.file;
        const url = this.props.action;
        const formData = new FormData();
        formData.append('name', 'upload');
        formData.append('file', file.originFileObj);
    
        $post(url, formData).then(data => {
            if(data) {
                this.props.saveFun(this.props.type, data.data);
            }
        });
    };

    /**
     * limit your upload ===> limit 15M and jpg/png
     */
    beforeUpload = (file) => {
        let limit15 = file.size / 1024 / 1024 < 15;
        if (!limit15) {
            this.showError("出错啦!", "上传文件过大");
            return false;
        }
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImg) {
          this.showError("错误信息!", "只能上传jpg, 或者png");
          return false;
        }
    
        return true;
    };

    /**
     * show memo
     * 
     * @param type
     * @param title
     * @param message
     */
    showError = (title, message) => {
        notification.open({
            message: title,
            description: message,
            icon: <Icon type="frown-o" style={{ color: 'red' }} />,
        });
    };
}
