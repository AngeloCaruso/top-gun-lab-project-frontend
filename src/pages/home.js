import { DeleteOutlined, EditOutlined, ExceptionOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Layout, Card, Table, Tag, Space, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllCrons } from '../api/cron-service';

const { Header, Content, Footer } = Layout;

function Home() {
    const [list, setList] = useState([]);

    const crons = getAllCrons();

    useEffect(() => {
        crons.then(response => {
            console.log(response);
            setList(response.data)
        })
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            key: 'schedule',
            align: 'center'
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            align: 'center',
            render: (active) => <Tag color={active ? 'green' : 'volcano'}>{active ? 'Active' : 'Disabled'}</Tag>
        },
        {
            title: 'Actions',
            key: 'active',
            align: 'center',
            render: (cron) => (
                <Space size='small'>
                    <Button icon={<ExceptionOutlined />} />
                    <Button icon={<EditOutlined />} />
                    <Button danger icon={<DeleteOutlined />} />
                </Space>
            )
        }
    ];

    return (
        <>
            <Layout style={{height: '100vh'}}>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <h1 className='white-text'>CRON MANAGER</h1>
                </Header>
                <Content className="site-layout" style={{ padding: '0 200px', marginTop: 100 }}>
                    <Card>
                        <Button icon={<FieldTimeOutlined />} type='primary' size='large' style={{ marginBottom: 10, float: 'right' }}> New CRON Job </Button>
                        <Table dataSource={list} columns={columns} rowKey="_id" pagination={false} />
                    </Card>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Top Gun Lab Final Project
                </Footer>
            </Layout>
        </>
    )
}

export default Home;
