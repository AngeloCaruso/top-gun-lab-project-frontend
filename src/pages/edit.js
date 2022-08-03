import { Button, Row, Col, Typography, Form, Input, Card, Switch, notification } from "antd";
import { TagOutlined, GlobalOutlined } from '@ant-design/icons';
import { Cron } from 'react-js-cron';
import { useState, useEffect } from "react";
import { updateCron, getCron } from '../api/cron-service';
import { useNavigate, useParams } from "react-router-dom";

import 'react-js-cron/dist/styles.css';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState('30 5 * * 1,6');
    const [form] = Form.useForm();

    useEffect(() => {
        getCron(id)
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login');
                    return;
                }

                if (response.status) {
                    setValue(response.data.schedule);
                    form.setFieldsValue({
                        name: response.data.name,
                        url: response.data.url,
                        active: response.data.active
                    });
                }
            })
    }, []);



    const onFinish = (data) => {
        if (!data.active) {
            data.active = false;
        }
        const cron = { id ,...data, schedule: value };
        updateCron(cron).then((response) => {
            if (response.status === 401) {
                navigate('/login');
                return;
            }

            if (response.status=== 200) {
                navigate('/dashboard/jobs');
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
                        form={form}
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
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>


            </div>
        </>
    );
}

export default Edit;