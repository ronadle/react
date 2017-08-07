import React from "react";
import { Row, Col, Menu, Icon, Button, Modal, Tabs, Form, Input, message} from 'antd';
import { Link } from "react-router";
import { get } from "../../fetch/get.js";
import { post } from "../../fetch/post.js";
import Logo from "../../static/images/iwennews.png";
import "../../static/css/pc_header.css";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class PCHeader extends React.Component{

    constructor(){
        super();
        this.state = {
            current:"top",
            isLogin:false,
            userNickName:"未知",
            modalVisible:false,
            action:"login"
        }
    }

    //进入是，判断用户名和秘密是否存在，如果存在则直接登录状态，如果不出在，爱那那去
    componentWillMount(){
        if(localStorage.getItem("username")){
            this.setState({
                userNickName:localStorage.getItem("username"),
                isLogin:true
            })
        }
    }


    // Menu的事件
    currentClick(event){
        //唤醒“登录注册”对话框
        if(event.key == "register"){
            this.setState({
                modalVisible:true
            })
        }
        this.setState({
            current:event.key
        })
    }

    //退出登录
    logout(){
        this.setState({
            isLogin:false,
        })
        localStorage.clear();
    }

    // 控制"登录注册对话框"的显示与隐藏
    setModalVisible(flag){
        this.setState({
           modalVisible:flag 
        })
    }

    /**
     * 区分是登录还是注册
     * action:代表登录和注册的状态
     */

    callback(key){
        if(key == "1"){
            this.setState({
                action:"login"
            })
        }else if(key == "2"){
            this.setState({
                action:"register"
            })
        }
    }

    // 登录注册
    handlerSubmit(event){
        event.preventDefault();

        // 新版本读取数据方案
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //     }
        // });

        //获取输入的信息
        var formData = this.props.form.getFieldsValue();
        if(this.state.action == "login"){
            //登录
            let result = fetch("http://www.iwen.wiki/sxtstu/news/selectuser.php?username="+formData.r_username+"&password="+formData.r_password);
            result.then(res => {
                return res.json();
            }).then(json => {
                this.setState({
                    userNickName:json.username,
                    isLogin:true,
                    modalVisible:false
                })
                // 用户名密码的存储
                localStorage.setItem("username",json.username);
                localStorage.setItem("password",json.password);
            })
        }else if(this.state.action == "register"){
            //注册
            let result = fetch("http://www.iwen.wiki/sxtstu/news/adduser.php?username="+formData.username+"&password="+formData.password+"&repassword="+formData.confirmpassword);
            result.then(res => {
                return res.json();
            }).then(json => {
                message.success(json);
                this.setModalVisible(false);
                this.setState({
                    isLogin:true,
                    userNickName:formData.username
                })
            })
        }
    }

    render(){

        //读取用户数据
        var username = localStorage.getItem("username");
        var password = localStorage.getItem("password");

        // var {getFieldProps} = this.props.form;
        const { getFieldDecorator } = this.props.form;
        var showMenu = this.state.isLogin 
        ?
        <Menu.Item key="logout" className="header-login">
            <Button type="primary">{this.state.userNickName}</Button>
            <Button type="dashed">
                <Link to={`/center/${username}/${password}`}>个人中心</Link>
            </Button>
            <Button type="ghost" onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item> 
        :
        <Menu.Item key="register" className="header-login">
            登录|注册
        </Menu.Item> 

        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Row>
                            <Col span={1}>
                                <div className="logo">
                                    <Link to={`/`}>
                                        <img src={Logo} alt="logo"/>
                                    </Link>
                                </div>
                            </Col>
                            <Col span={22}>
                                <Menu onClick={this.currentClick.bind(this)} className="menu" mode="horizontal" selectedKeys={[this.state.current]}>
                                    <Menu.Item key="top">
                                        <Link to={`/`}>
                                            <Icon type="to-top" />
                                            头条
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="guonei">
                                        <Link to={`/guonei`}>
                                            <Icon type="minus-square" />
                                            国内
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="guoji">
                                        <Link to={`/guoji`}>
                                            <Icon type="global" />
                                            国际
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="tiyu">
                                         <Link to={`/tiyu`}>
                                            <Icon type="smile" />  
                                            体育
                                         </Link>
                                    </Menu.Item>
                                    <Menu.Item key="yule">
                                        <Link to={`/yule`}>
                                            <Icon type="appstore" />
                                            娱乐
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="junshi">
                                        <Link to={`/junshi`}>
                                            <Icon type="rocket" />
                                            军事
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="keji">
                                        <Link to={`/keji`}>
                                            <Icon type="fork" />
                                            科技
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="shishang">
                                        <Link to={`/shishang`}>
                                            <Icon type="apple" />
                                            时尚
                                        </Link>
                                    </Menu.Item>
                                    {showMenu}
                                </Menu>
                               {/* 登录注册对话框:对话框、tabs、表单 */}
                               <Modal visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
                                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                                        {/* 登录:1 */}
                                        <TabPane tab="登录" key="1">
                                            <Form layout="horizontal" onSubmit={this.handlerSubmit.bind(this)}>
                                                <FormItem label="用户名">
                                                    {/*<Input placeholder="请输入用户名" type="text" {...getFieldProps("r_username")} />*/}
                                                    {getFieldDecorator('r_username', {
                                                        rules: [{ required: true, message: 'Please input your username!' }],
                                                    })(
                                                        <Input placeholder="请输入用户名"/>
                                                    )}
                                                </FormItem>
                                                <FormItem label="密码">
                                                    {/*<Input placeholder="请输入密码" type="password" {...getFieldProps("r_password")}/>*/}
                                                    {getFieldDecorator('r_password', {
                                                        rules: [{ required: true, message: 'Please input your password!' }],
                                                    })(
                                                        <Input placeholder="请输入密码" type="password"/>
                                                    )}
                                                </FormItem>
                                                <Button type="primary" htmlType="submit">登陆</Button>
                                            </Form>
                                        </TabPane>
                                        {/* 注册:2 */}
                                        <TabPane tab="注册" key="2">
                                            <Form layout="horizontal" onSubmit={this.handlerSubmit.bind(this)}>
                                                <FormItem label="用户名">
                                                    {/*<Input placeholder="请输入用户名" type="text" {...getFieldProps("username")}/>*/}
                                                    {getFieldDecorator('username', {
                                                        rules: [{ required: true, message: 'Please input your username!' },{max:6}],
                                                    })(
                                                        <Input placeholder="请输入用户名"/>
                                                    )}
                                                </FormItem>
                                                <FormItem label="密码">
                                                    {/*<Input placeholder="请输入密码" type="password" {...getFieldProps("password")}/>*/}
                                                    {getFieldDecorator('password', {
                                                        rules: [{ required: true, message: 'Please input your password!' }],
                                                    })(
                                                        <Input placeholder="请输入密码" type="password"/>
                                                    )}
                                                </FormItem>
                                                <FormItem label="确认密码">
                                                    {/*<Input placeholder="请在次输入密码" type="password"{...getFieldProps("confirmpassword")} />*/}
                                                    {getFieldDecorator('confirmpassword', {
                                                        rules: [{ required: true, message: 'Please input your confirmpassword!' }],
                                                    })(
                                                        <Input placeholder="请在次输入密码" type="password"/>
                                                    )}
                                                </FormItem>
                                                <Button type="primary" htmlType="submit">注册</Button>
                                            </Form>
                                        </TabPane>
                                    </Tabs>
                               </Modal>

                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

export default PCHeader = Form.create({})(PCHeader);