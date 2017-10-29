import React, {Component} from 'react';
import {
    Card,
    Row,
    Col,
    Form,
    Input,
    Radio,
    Select,
    Tooltip,
} from 'antd';
import UploadImg from '../commonComponents/UploadImg'
import {EMPLOYEE_POSITION, EMPLOYEE_LEVEL} from './EmployeeConstant'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class EmployeeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headUrl: '',
            lifeUrl: '',
            headerMemoVisible: false,
        };
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {headUrl, headerMemoVisible} = this.state;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 7},
          };

        return (
            <div>
                <Card title="添加员工信息" style={{backgroundColor:"#E8E8E8"}}>
                    <Row style={{marginBottom: 20}}>
                        <Col span={7}>
                            <Card bordered={false} className="myhead_card">
                                <div className="upload_head_out_div">
                                    <UploadImg 
                                        type = "headUrl" 
                                        btnName="上传头像"
                                        action=""
                                        saveFun = {this.saveImgUrl} 
                                    />
                                    
                                    <Tooltip placement="rightTop" title="请上传头像" visible={headerMemoVisible}>
                                        <div 
                                            className="upload_head_img" 
                                            onMouseOver={this.headerMemoOnMouseOver}
                                            onMouseOut={this.headerMemoOnMouseOut}
                                        >
                                            <div className="head_img">
                                                <img src = {headUrl} />
                                            </div>
                                        </div>
                                    </Tooltip>
                                </div>
                            </Card>
                        </Col>

                        <Col span={8} offset={1}>
                            <Card className="myhead_card" bordered={false}>
                                <div className="upload_head_out_div">
                                    <UploadImg type="lifeUrl" btnName="上传生活照" action="" saveFun = {this.saveImgUrl} />
                                </div>
                            </Card>
                        </Col>

                        <Col span={7} offset={1}>
                            <Card bordered={false} className="myhead_card">
                                <div className="motto_out">
                                    <span><font style={{color:'red'}}>*</font>请输入座右铭:</span>
                                    <div style={{width:'100%', marginTop:"20"}}>
                                        {<Input type="textarea" placeholder="THINK YOU FOR MOTTO" rows={10} />}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Form>
                        <Row>
                            <Col>
                                <Card title="基本信息" >
                                    <FormItem label="昵称" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('loginName', {
                                                rules: [{required: true, message: '请输入登录名'}]
                                            })(
                                                <Input />,
                                            )
                                        }
                                    </FormItem>

                                    <FormItem label="密码" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('password', {
                                                rules: [{required: true, message: '请输入密码'}, {max: 6, message: '密码最多6位'}]
                                            })(
                                                <Input type="password" />,
                                            )
                                        }
                                    </FormItem>

                                    <FormItem label="姓名" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('name', {
                                                rules: [{required: true, message: '请输入您的真实姓名'}]
                                            })(
                                                <Input />,
                                            )
                                        }
                                    </FormItem>

                                    <FormItem label="性别" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('gender', {
                                                rules: [{required: true, message: '请选择性别'}]
                                            })(
                                                <RadioGroup>
                                                    <Radio value="男">男</Radio>
                                                    <Radio value="女">女</Radio>
                                                </RadioGroup>
                                            )
                                        }
                                    </FormItem>

                                    <FormItem label="手机" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('mobile', {
                                                rules: [
                                                    {required: true, message: '手机号码不能为空'},
                                                    {pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/, message: '手机格式不对'}
                                                ]
                                            })(
                                                <Input />,
                                            )
                                        }
                                    </FormItem>

                                    <FormItem label="邮箱" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('email', {
                                                rules: [
                                                    {required: true, message: '请输入邮箱'},
                                                    {pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: '邮箱格式不正确'}
                                                ]
                                            })(
                                                <Input />,
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="职位" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('position', {
                                                rules: [{required: true, message: '请选择职位'}]
                                            })(
                                                <Select style={{width: 125}}>
                                                {
                                                  EMPLOYEE_POSITION.map((record, index) =>
                                                    <Option key={index} value={record.value}>{record.text}</Option>,
                                                  )
                                                }
                                              </Select>,
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="级别" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('level', {
                                                rules: [{required: true, message: '请选择级别'}]
                                            })(
                                                <Select style={{width: 125}}>
                                                {
                                                  EMPLOYEE_LEVEL.map((record, index) =>
                                                    <Option key={index} value={record.value}>{record.text}</Option>,
                                                  )
                                                }
                                              </Select>,
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="履历" {...formItemLayout} style={{marginBottom: 20}}>
                                        {
                                            getFieldDecorator('introduction', {
                                                rules: [{required: true, message: '履历简介不能为空'}]
                                            })(
                                                <Input type="textarea" placeholder="PLEASE INPUT..." rows={4} />
                                            )
                                        }
                                    </FormItem>

                                    <div className="add_employee_btn">确认提交</div>  

                                    <FormItem label="" {...formItemLayout} style={{marginBottom: 20}}></FormItem>
                                </Card>
                            </Col>
                        </Row>
                    </Form>        
                </Card>
            </div>
        );
    }

    /**
     * save imgUrl for show
     */
    saveImgUrl = (type,url) => {
        this.setState({ [type]: url })
    }

    /**
     * if show header memo when mouse over
     */
    headerMemoOnMouseOver = () => {
        let visible = this.state.headUrl ? false : true;
        this.setState({ headerMemoVisible: visible });
    }

    /**
     * cancel header memo show
     */
    headerMemoOnMouseOut = () => {
        this.setState({headerMemoVisible: false});
    }

}

export default Form.create()(EmployeeAdd);