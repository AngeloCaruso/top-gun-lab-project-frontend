import { Card, Col, Row, Typography, Button, Timeline, Space, Popconfirm, message, Table, Tag, Badge } from "antd";
import { ExceptionOutlined, EditOutlined, DeleteOutlined, PauseOutlined, IssuesCloseOutlined, ClockCircleOutlined } from "@ant-design/icons";

import Paragraph from "antd/lib/typography/Paragraph";
import { useEffect, useState } from "react";

import { getAllCrons, deleteCron, getLogsByUser } from '../api/cron-service';
import { formatDatetime } from "../utils/formatDates";
import { useNavigate } from "react-router-dom";
import cronstrue from 'cronstrue';

function Home() {
    const { Title, Text } = Typography;
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [timeLine, setTimeLine] = useState([]);
    const [loading, setLoading] = useState(true);
    const [created, setCreated] = useState(0);
    const [active, setActive] = useState(0);
    const [disabled, setDisabled] = useState(0);

    useEffect(() => {
        getAllCrons()
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                    return;
                }

                if (response.status) {
                    setList(response.data);
                    setCreated(response.data.length);
                    setActive(response.data.filter(cron => cron.active).length);
                    setDisabled(response.data.filter(cron => !cron.active).length);
                    setLoading(false);
                }
            });

        getLogsByUser()
            .then(response => {
                if (response.status === 401) {
                    navigate('/login');
                    return;
                }

                if (response.status) {
                    setTimeLine(response.data);
                }
            });
    }, [navigate]);

    const confirm = (id) => {
        setLoading(true);
        deleteCron(id)
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login');
                    return;
                }

                if (response.status) {
                    const index = list.findIndex(cron => {
                        return cron._id === id
                    })
                    list.splice(index, 1)
                    setList([...list])
                    setLoading(false);
                    message.success('CRON Job deleted correctly');
                }
            });
    };

    const onClickLogs = (id) => {
        navigate(`/dashboard/logs/${id}`);
    }

    const onClickEdit = (id) => {
        navigate(`/dashboard/edit/${id}`);
    }

    const topCards = [
        {
            today: "Total created jobs",
            title: created,
            icon: <ClockCircleOutlined />,
            bnb: "bnb2",
            color: ''
        },
        {
            today: "Active jobs",
            title: active,
            icon: <IssuesCloseOutlined />,
            bnb: "bnb2",
            color: '#52c41a'
        },
        {
            today: "Disabled jobs",
            title: disabled,
            icon: <PauseOutlined />,
            bnb: "redtext",
            color: '#f5222d'
        }
    ];

    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (name) => <h6>{name}</h6>
        },
        {
            title: 'SCHEDULE',
            dataIndex: 'schedule',
            key: 'schedule',
            align: 'center',
            render: (schedule) => (
                <Space direction="vertical" size='small'>
                    <span>{schedule}</span>
                    <Badge status="processing" text={cronstrue.toString(schedule)} />
                </Space>
            )
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            align: 'center'
        },
        {
            title: 'STATUS',
            dataIndex: 'active',
            key: 'active',
            align: 'center',
            render: (active) => <Tag color={active ? 'green' : 'volcano'}>{active ? 'Active' : 'Disabled'}</Tag>
        },
        {
            title: 'ACTIONS',
            align: 'center',
            render: (cron) => (
                <Space size='small'>
                    <Button icon={<ExceptionOutlined />} onClick={() => onClickLogs(cron._id)} >History</Button>
                    <Button icon={<EditOutlined />}  onClick={() => onClickEdit(cron._id)} >Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this CRON Job?"
                        onConfirm={() => confirm(cron._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <>
            <div className="layout-content">
                <Row className="rowgap-vbox" gutter={[24, 0]}>
                    {topCards.map((c, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={8}
                            className="mb-24"
                        >
                            <Card bordered={false} className="criclebox ">
                                <div className="number">
                                    <Row align="middle" gutter={[24, 0]}>
                                        <Col xs={18}>
                                            <span>{c.today}</span>
                                            <Title level={3}>
                                                {c.title}
                                            </Title>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="icon-box" style={{ background: c.color }}>{c.icon}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
                        <Card bordered={false} className="criclebox cardbody h-full">
                            <div className="project-ant">
                                <div>
                                    <Title level={5}>CRON Jobs</Title>
                                    <Paragraph className="lastweek">
                                        Created jobs
                                    </Paragraph>
                                </div>
                            </div>
                            <div className="ant-list-box table-responsive">
                                <Table dataSource={list} columns={columns} rowKey="_id" loading={loading} />
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <div className="timeline-box">
                                <Title level={5}>Job History</Title>
                                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                                    Last 8 executed jobs
                                </Paragraph>

                                <Timeline
                                    className="timelinelist"
                                    reverse={true}
                                >
                                    {timeLine.map((t, index) => (
                                        <Timeline.Item color={'green'} key={index}>
                                            <Title level={5}>{t.cron_id.name}</Title>
                                            <Text>{formatDatetime(t.created_at)}</Text>
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </div>
        </>
    );
}

export default Home;
