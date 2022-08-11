import React, { useState } from "react";
import { Layout, Button, Typography, Card, Form, Input, notification, Spin } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { register } from '../api/user';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (data) => {
        try {
            setLoading(true);
            const response = await register(data);
            setLoading(false);
            if (response.success) {
                document.cookie = `user=${response.data.user.email}`;
                document.cookie = `jwt=${response.data.token}`
                navigate(`/dashboard/jobs`);
            }
        } catch (error) {
            openNotification('top', 'Register error. Please, try again later')
        }
    };

    const openNotification = (placement, body) => {
        notification.error({
            message: 'Error',
            description: body,
            placement,
        });
    };

    return (
        <>
            <div className="layout-default ant-layout layout-sign-up">
                <Header>
                    <div className="header-col header-brand">
                        <h5>CRON Manager</h5>
                    </div>
                </Header>

                <Content className="p-0">
                    <div className="sign-up-header">
                        <div className="content">
                            <Title>Sign Up</Title>
                            <p className="text-lg">
                                Don't have an account yet? Sign up for free, it only takes a minute.
                            </p>
                        </div>
                    </div>

                    <Card
                        className="card-signup header-solid h-full ant-card pt-0"
                        title={<h5>Basic information</h5>}
                        bordered="false"
                    >
                        <Spin spinning={loading}>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                className="row-col"
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}>
                                    <Input placeholder="Email" type='email' />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="repeat_password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!'
                                        }
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        style={{ width: "100%" }}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        SIGN UP
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p className="font-semibold text-muted text-center">
                                Already have an account?{" "}
                                <Link to="/login" className="font-bold text-dark">
                                    Sign in
                                </Link>
                            </p>
                        </Spin>
                    </Card>
                </Content>
                <Footer>
                    <p className="copyright">
                        {" "}
                        Top Gun Lab Final Project
                    </p>
                </Footer>
            </div>
        </>
    );
}

export default Register;
