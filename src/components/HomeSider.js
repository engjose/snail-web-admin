import React, { Component } from 'react';
import { Link } from 'react-router';
import {
    Menu,
    Icon,
    Layout,
} from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class HomeSider extends Component {
    state = {
        collapsed: false,
        height: 500,
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
    }

    render() {
        const {height} = this.state;

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
                </Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={contentStyle}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

