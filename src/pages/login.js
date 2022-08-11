import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, notification, Spin } from "antd";
import signinbg from "../assets/images/logo-cron-manager-3.png";
import { login } from '../api/user';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (data) => {
        try {
            setLoading(true);
            const response = await login(data)
            setLoading(false);
            if (response.success) {
                document.cookie = `user=${response.data.user.email}`;
                document.cookie = `jwt=${response.data.token}`;
                navigate(`/dashboard/jobs`);
            } else {
                throw new Error('Username or password incorrect');
            }
        } catch (error) {
            openNotification('top', error.message || 'Login error. Please, try again later');
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
            <Layout className="layout-default layout-signin">
                <Header>
                    <div className="header-col header-brand">
                        <h5>CRON Manager</h5>
                    </div>
                </Header>
                <Content className="signin">
                    <Spin spinning={loading}>
                        <Row gutter={[24, 0]} justify="space-around">
                            <Col
                                xs={{ span: 24, offset: 0 }}
                                lg={{ span: 6, offset: 2 }}
                                md={{ span: 12 }}
                            >
                                <Title className="mb-15">Sign In</Title>
                                <Title className="font-regular text-muted" level={5}>
                                    Enter your email and password to sign in
                                </Title>
                                <Form
                                    onFinish={onFinish}
                                    layout="vertical"
                                    className="row-col"
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Email"
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
                                        label="Password"
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

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ width: "100%" }}
                                        >
                                            SIGN IN
                                        </Button>
                                    </Form.Item>
                                    <p className="font-semibold text-muted">
                                        Don't have an account?{" "}
                                        <Link to="/register" className="text-dark font-bold">
                                            Sign Up
                                        </Link>
                                    </p>
                                </Form>
                            </Col>
                            <Col
                                className="sign-img"
                                style={{ padding: 12 }}
                                xs={{ span: 24 }}
                                lg={{ span: 12 }}
                                md={{ span: 12 }}
                            >
                                <img src={signinbg} alt="" />
                            </Col>
                        </Row>
                    </Spin>
                </Content>
                <Footer>
                    <p className="copyright">
                        {" "}
                        Top Gun Lab Final Project
                    </p>
                </Footer>
            </Layout>
        </>
    );
}
export default Login;
