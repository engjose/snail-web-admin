import React, { Component } from 'react';
import { Link } from 'react-router';
import {
    Menu,
    Icon,
    Layout,
    Avatar,
    Badge,
    Modal, 
    Form,
    Input,
    message,
} from 'antd';
import { $post } from '../axios/HttpAxios';
import { ACTION_URL } from './ActionUrl';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

const errIcon = <Icon type="frown-o" style={{color:'red'}} />;
class HomeSider extends Component {
    state = {
        collapsed: false,
        height: 500,
        messageCount: 0,
        loginMadalVisible: false,
        loginName: '',
        password: '',
        headUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    /**
     * 加载前获取屏幕高度
     */
    componentWillMount() {
        let contentHeight = document.body.clientHeight - 110;
        this.setState({height: contentHeight});
        
        //设置用户相关信息
        let loginName = localStorage.getItem("loginName") ? localStorage.getItem("loginName") : this.state.loginName;
        let headUrl = localStorage.getItem("headUrl") ? localStorage.getItem("headUrl"): this.state.headUrl;
        let expireTime = localStorage.getItem("expireTime");
        console.log(expireTime);
        console.log(Date.parse(new Date()));
        if(expireTime && expireTime >= Date.parse(new Date())) {
            this.setState({
                loginName: loginName,
                headUrl: headUrl,
            });
        } else {
            localStorage.clear();
        }
    }

    render() {
        const {height, messageCount, headUrl, loginName, 
            loginMadalVisible, password} = this.state;
        const { getFieldDecorator } = this.props.form;

        const contentStyle = {
            padding: 24,
            background: '#fff',
            minHeight: height,
            margin: '24px 16px',
        };

        const headerStyle = {
            background: '#fff',
            padding: 0,
            height: 80
        };

        const logoStyle = {
            height: 32,
            background: "#333",
            borderRadius: 6,
            margin: 16,
        };

        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10},
        };

        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" style={logoStyle}/>
                    {
                        localStorage.getItem("xToken") ?
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <SubMenu
                                    key="user"
                                    title={<span><Icon type="user" /><span>用户管理</span></span>}
                                >
                                    <Menu.Item key="employeeMgr"><Link to={'/employees'}>员工管理</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="articles"
                                    title={<span><Icon type="tag" /><span>文章管理</span></span>}
                                >
                                    <Menu.Item key="artileCreate"><Link to={'/articles/add'}>发表文章</Link></Menu.Item>
                                    <Menu.Item key="artileList"><Link to={'/articles/list'}>文章列表</Link></Menu.Item>
                                    <Menu.Item key="artileTags"><Link to={'/articles/tags'}>标签管理</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        :
                            <span style={{color:'white', fontWeight:700, marginLeft:'20%', fontSize:20}}>请先登录!</span>
                    }
                </Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />

                        <div style={{float:"right", textAlign:'center', height:'100%',marginTop:10 }}>
                            {
                                localStorage.getItem("xToken") ?
                                    <span>
                                        欢迎: <span style={{color: 'red'}}>{loginName}</span>
                                        <span style={{float:"right", width:50, height: 50, marginRight:30, marginLeft:10}}>
                                            <Badge count={messageCount}>
                                                <Avatar src={headUrl} style={{width:50, height: 50}}/>
                                            </Badge>
                                        </span>
                                    </span>
                                :
                                    <span className="loginBtn" onClick={(visible) => this.setLoginModal(true)}>
                                        你好,请登录
                                    </span>
                            }
                        </div>
                    </Header>
                    <Content style={contentStyle}>
                        {this.props.children}
                    </Content>
                </Layout>

                <Modal
                    title="请登录"
                    visible={loginMadalVisible}
                    onOk={this.login}
                    onCancel={this.cancleLogin}
                    okText="登录"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem label="用户名" {...formItemLayout} style={{marginBottom: 20}}>
                            {
                                getFieldDecorator('loginName', {
                                    rules: [{required: true, message: '请输入登录名'}]
                                })(
                                    <Input onChange={this.saveLoginName}/>,
                                )
                            }
                        </FormItem>
                        <FormItem label="密  码" {...formItemLayout} style={{marginBottom: 20}}>
                            {
                                getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码'}, {max: 6, message: '密码最多6位'}]
                                })(
                                    <Input type="password" onChange={this.savePassword}/>,
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </Layout>
        );
    }

    setLoginModal = (visible) => {
        this.setState({loginMadalVisible: visible});
    }

    saveLoginName = (e) => {
        this.setState({loginName: e.target.value});
    }

    savePassword = (e) => {
        this.setState({password: e.target.value});
    }

    cancleLogin = () => {
        this.setState({
            loginName: '',
            password: '',
        });
        this.setLoginModal(false);
    }

    /**
     * 登录后台系统
     */
    login = () => {
        let { loginName ,password } = this.state;
        if (!loginName) {
            message.error("用户名不能为空");
            return;
        }
        if (!password) {
            message.error("密码不能为空");
            return;
        }

        let params = {
            loginName: loginName,
            password: password,
            app: 'SNAIL_ADMIN',
        }
        let url = `${ACTION_URL.SSO}/user/login`;
        $post(url, params, errIcon).then(data => {
            if(data) {
                if(data.code === 200) {
                    this.setLoginModal(false);
                    localStorage.setItem("xToken", data.xToken);
                    localStorage.setItem("loginName", data.loginName);
                    localStorage.setItem("headUrl", data.headUrl);
                    let exipreTime = Date.parse(new Date()) + 30 * 60 * 1000;
                    localStorage.setItem("expireTime", exipreTime);
                    window.location.href = "#/home";
                }else {
                    message.error(data.message);
                }
            }
        });
    }
}

export default Form.create()(HomeSider);

