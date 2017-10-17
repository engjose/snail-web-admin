import React, {Component} from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch'
import axios from 'axios';
import {ACTION_URL} from '../ActionUrl';
import {EMPLOYEE_LIST_COLUMN} from './EmployeeConstant';

import {
    Card,
    Form,
    Icon,
    Input,
    Button,
    Table,
    notification,
} from 'antd';

const FormItem = Form.Item;

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
                defaultCurrent: 1,
                showSizeChanger: true,
                showTotal: this.showTotal,
              },
        };
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };
        const { getFieldDecorator } = this.props.form;
        const {employeeList, pagination} = this.state;

        return (
            <Card title="员工管理">
                <Card style={{marginBottom:30}}>
                    <Form layout='inline' onSubmit={this.submitQuery}>
                        <FormItem label="手机号" {...formItemLayout}>
                            {
                                getFieldDecorator('phoneNumber')(
                                    <Input />,
                                )
                            }
                        </FormItem>
                        <FormItem label="登录昵称" {...formItemLayout}>
                            {
                                getFieldDecorator('loginName')(
                                    <Input />,
                                )
                            }
                        </FormItem>
                        <FormItem label="真实姓名" {...formItemLayout}>
                            {
                                getFieldDecorator('name')(
                                    <Input />,
                                )
                            }
                        </FormItem>
                        <Button type="primary" icon="search" shape="circle" style={{marginRight:5}} htmlType="submit" />
                        <Button type="primary" icon="search" htmlType="submit" >查询</Button>
                    </Form>
                </Card>

                <Card>
                    <Table 
                    columns={EMPLOYEE_LIST_COLUMN} 
                    dataSource={employeeList}
                    pagination={pagination}
                    />
                </Card>
            </Card>
        );
    }

    /**
     * 页面加载之前
     */
    componentWillMount() {
        let option = {
            key: 'option',
            width: '20%',
            title: '操作',
            dataIndex: 'option',
            render: (text, record) => {
                return (
                    <span>
                        <Link to={`/employees/detail/${record.employeeId}`}>查看详情</Link>
                    </span>
                );
            }
        };
        EMPLOYEE_LIST_COLUMN.push(option);
    }

    /**
     * 组件加载完成之后
     */
    componentDidMount() {
        this.initQuery();
    }

    showTotal = (total) => {
        let count = `共${total}条`;
        return count;
    };

    initQuery = () => {
        let pagination = {
            total: 0,
            current: 1,
            pageSize: 10,
            defaultCurrent: 1,
          };
        this.getList(pagination);
    }

  /**
   * 查询按钮查询
   */
  submitQuery = (e) => {
    e.preventDefault();

    let pagination = {
      total: 0,
      current: 1,
      pageSize: 10,
      defaultCurrent: 1,
    };
    this.getList(pagination);
  };

    /**
     * 查询列表:发送请求
     */
    getList = (pagination) => {
        let formValue = this.props.form;
        let name = formValue.getFieldValue('name') ? formValue.getFieldValue('name') : '';
        let phoneNumber = formValue.getFieldValue('phoneNumber') ? formValue.getFieldValue('phoneNumber') : '';
        let loginName = formValue.getFieldValue('loginName') ? formValue.getFieldValue('loginName') : '';

        let url = `${ACTION_URL.SSO}employee/employees`;
        axios.get(url, {
            params:{
                name,
                loginName,
                mobile: phoneNumber,
                pageNo: pagination.current,
                pageSize: pagination.pageSize,
            }
        }).then((response) => {
            this.setState({employeeList: response.data.data});
            this.setState({
                employeeList: response.data.data,
                pagination: {
                  total: response.data.totals,
                  showSizeChanger: true,
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  defaultCurrent: pagination.current,
                },
              });
        }).catch((error) => {
            this.showError("出错了!", error.message);
        });
    }

    /**
     * 消息提示
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

export default Form.create()(EmployeeList);