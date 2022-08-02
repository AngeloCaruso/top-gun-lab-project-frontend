import { Card, Col, Row, Typography, Button, Timeline, Radio, Space, Popconfirm, message, Table, Tag, Badge } from "antd";
import { ExceptionOutlined, EditOutlined, DeleteOutlined, PauseOutlined, IssuesCloseOutlined, ClockCircleOutlined } from "@ant-design/icons";

import Paragraph from "antd/lib/typography/Paragraph";
import { useEffect, useState } from "react";

import { getAllCrons, deleteCron, getLogsByUser } from '../api/cron-service';
import { formatDatetime } from "../utils/formatDates";

function Home() {
    const { Title, Text } = Typography;

    const [list, setList] = useState([]);
    const [timeLine, setTimeLine] = useState([]);
    const [loading, setLoading] = useState(true);
    const [created, setCreated] = useState(0);
    const [active, setActive] = useState(0);
    const [disabled, setDisabled] = useState(0);

    const crons = getAllCrons();
    const logs = getLogsByUser();

    useEffect(() => {
        crons.then(response => {
            setList(response.data);
            setCreated(response.data.length);
            setActive(response.data.filter(cron => cron.active).length);
            setDisabled(response.data.filter(cron => !cron.active).length);
            setLoading(false);
        });

        logs.then(response => {
            setTimeLine(response.data);
        });
    }, []);

    const confirm = (id) => {
        setLoading(true);
        deleteCron(id)
            .then((response) => {
                if (response.success) {
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

    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (name) => <h6>{name}</h6>
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            key: 'schedule',
            align: 'center',
            render: (schedule) => (
                <Space direction="vertical" size='small'>
                    <span>{schedule}</span>
                    <Badge status="processing" text="Every 5 minutes" />
                </Space>
            )
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
                    <Button icon={<ExceptionOutlined />}>History</Button>
                    <Button icon={<EditOutlined />}>Edit</Button>
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

    const timelineList = [
        {
            title: "Cron task 1 | Request to https://yesno.wtf/api/",
            time: "09 JUN 7:20 PM",
            color: "green",
        },
        {
            title: "Cron task 2 | Request to https://yesno.wtf/api/",
            time: "08 JUN 12:20 PM",
            color: "green",
        },
        {
            title: "Cron task 3 | Request to https://yesno.wtf/api/",
            time: "04 JUN 3:10 PM",
            color: "green",
        },
        {
            title: "Cron task 4 | Request to https://yesno.wtf/api/",
            time: "02 JUN 2:45 PM",
            color: "green",
        },
        {
            title: "Cron task 5 | Request to https://yesno.wtf/api/",
            time: "18 MAY 1:30 PM",
            color: "red",
        },
        {
            title: "Cron task 6 | Request to https://yesno.wtf/api/",
            time: "14 MAY 3:30 PM",
            color: "green",
        },
        {
            title: "Cron task 7 | Request to https://yesno.wtf/api/",
            time: "14 MAY 3:30 PM",
            color: "red",
        },
        {
            title: "Cron task 8 | Request to https://yesno.wtf/api/",
            time: "14 MAY 3:30 PM",
            color: "green",
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
                                <div className="ant-filtertabs">
                                    <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                        <Radio.Group onChange={onChange} defaultValue="a">
                                            <Radio.Button value="a">ALL</Radio.Button>
                                            <Radio.Button value="b">ACTIVE</Radio.Button>
                                            <Radio.Button value="c">DISABLED</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-list-box table-responsive">
                                <Table dataSource={list} columns={columns} rowKey="_id" pagination={false} loading={loading} />
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
