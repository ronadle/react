
# 运行项目
# 执行：npm install


知识点：
    1.响应式处理
        安装：npm install --save-dev react-responsive
        处理：
            <MediaQuery query="(min-device-width:1224px)">
                <PCIndex />
            </MediaQuery>
    2.路由的处理
        安装：npm install --save-dev react-router



    3.关于表单的应用呢：
        1.引入：
            import { Row, Col, Menu, Icon, Button, Modal, Tabs, Form, Input} from 'antd';
            const FormItem = Form.Item;
            export default PCHeader = Form.create({})(PCHeader);
        2.表单的创建
            <FormItem label="用户名">
                //老版本
                {/*<Input placeholder="请输入用户名" type="text" {...getFieldProps("username")}/>*/}

                //新版本
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder="请输入用户名"/>
                    )}
                </FormItem>
        3.表单输入信息的获取：
            // var {getFieldProps} = this.props.form;
            const { getFieldDecorator } = this.props.form;

            <!--{...getFieldProps("username")}-->
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
                })(
                <Input placeholder="请输入用户名"/>
            )}

            // 新版本读取数据方案
            // this.props.form.validateFields((err, values) => {
            //     if (!err) {
            //         console.log('Received values of form: ', values);
            //     }
            // });

            //获取输入的信息
            var formData = this.props.form.getFieldsValue();

        4.登录的两种情况：
            1.session：浏览器之后不关闭，用户一直处于登录状态
            2.浏览器关闭掉，用户名密码在不退出的情况下，可以保存7天或者30天（开发者需求）
            
            技术处理：cookie
            简约方式：webstorage：localStorage   sessionStorage
            
       
