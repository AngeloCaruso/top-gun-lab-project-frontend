import { Form, Input, Button, Card, Space, Layout, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/user';

function Register() {
    const navigate = useNavigate();

    const onFinish = (data) => {
        register(data)
            .then((response) => {
                if (!response.success) {
                    openNotification('top', response.message)
                    return;
                }

                document.cookie = `jwt=${response.data.token}`

                navigate('/');
            })
    };

    const openNotification = (placement, body) => {
        notification.error({
            message: 'Error',
            description: body,
            placement,
        });
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Content style={{ padding: '0 300px' }}>
                <Card style={{ marginTop: 100 }}>
                    <Form
                        name="registration"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        autoComplete="off"
                        onFinish={onFinish}
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
                        <Form.Item
                            label="Confirm password"
                            name="repeat_password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                }
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Space size='small'>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                                Already have an account?
                                <Link to='/login'>Login now!</Link>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    )
}

export default Register;