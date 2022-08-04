import { Button, Row, Col, Typography, Form, Input, Card, Switch, notification } from "antd";
import { TagOutlined, GlobalOutlined } from '@ant-design/icons';
import { Cron } from 'react-js-cron';
import { useState } from "react";
import { createCron } from '../api/cron-service';
import { useNavigate } from "react-router-dom";

import 'react-js-cron/dist/styles.css';
import { env } from "../config/.env";

function Create() {
    const navigate = useNavigate();

    const [value, setValue] = useState('30 5 * * 1,6');

    const onFinish = (data) => {
        if (!data.active) {
            data.active = false;
        }
        const cron = { ...data, schedule: value };
        createCron(cron).then((response) => {
            if (response.status === 401) {
                navigate(`${env.baseUrl}/login`);
                return;
            }

            if (response.status === 201) {
                navigate(`${env.baseUrl}/dashboard/jobs`);
                return;
            }

            openNotification('top', response.message)
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
        <>
            <div className="layout-content">
                <Card bordered={false} className="criclebox h-full">
                    <Form
                        onFinish={onFinish}
                        layout="horizontal"
                        className="row-col"
                        autoComplete="off"
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input cron name!',
                                },
                            ]}>
                            <Input
                                placeholder="Cron name"
                                type='text'
                                prefix={<TagOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>

                        <Form.Item
                            name="url"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input cron url!',
                                },
                            ]}>
                            <Input
                                placeholder="Cron URL"
                                type='url'
                                prefix={<GlobalOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Active"
                            name="active"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>


                        <Row gutter={[24, 0]}   >
                            <Col xs={{ span: 24, offset: 0 }}
                                lg={{ span: 12, offset: 0 }}
                                md={{ span: 12 }}>
                                <Typography>
                                    <pre>Schedule: {value}</pre>
                                </Typography>
                            </Col>
                            <Col xs={{ span: 24, offset: 0 }}
                                lg={{ span: 12, offset: 0 }}
                                md={{ span: 12 }}>
                                <Form.Item>
                                    <Cron
                                        className="my-project-cron"
                                        value={value}
                                        setValue={setValue}
                                        clearButtonProps={{
                                            type: 'default',
                                        }}
                                    />
                                </Form.Item>

                            </Col>

                        </Row>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>


            </div>
        </>
    );
}

export default Create;