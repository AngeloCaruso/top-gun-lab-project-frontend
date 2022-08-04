import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLogsByCron } from '../api/cron-service';
import { Row, Col, Card, Table, Button, Space, Badge, Modal, Typography } from "antd";

import { InboxOutlined } from "@ant-design/icons";
import { getResponseTag } from "../utils/statusGuesser";
import { formatDatetime } from "../utils/formatDates";
import cronstrue from 'cronstrue';

function Logs() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [logList, setLogList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLogsByCron(id)
            .then((response) => {
                if (response.status === 401) {
                    navigate(`/login`);
                    return;
                }

                if (response.status) {
                    setLogList(response.data);
                    setLoading(false);
                }
            })
    }, [id, navigate]);

    const showInfoModal = ({status,response_log}) => {
        Modal.info({
            title: 'CRON Job Captured response',
            centered: true,
            width: 1000,
            content: (
                <Typography>
                    <span>code Status:{status} </span>
                    {getResponseTag(status)}
                    <pre style={{ height: '15vh', padding: 20 }}>{response_log}</pre>
                </Typography>
            ),
            onOk() { },
        });
    }

    const columns = [
        {
            title: "EXECUTED",
            dataIndex: "created_at",
            key: "created_at",
            align: 'center',
            render: (created_at) => formatDatetime(created_at)
        },
        {
            title: "SCHEDULE",
            key: "schedule",
            align: 'center',
            render: (cron) => (
                <Space direction="vertical" size='small'>
                    <span>{cron.cron_id.schedule}</span>
                    <Badge status="processing" text={cronstrue.toString(cron.cron_id.schedule)} />
                </Space>
            )
        },
        {
            title: "STATUS",
            align: 'center',
            render: (cron) => getResponseTag(cron.status)
        },
        {
            title: 'ACTIONS',
            align: 'center',
            render: (cron) => (
                <Space size='small'>
                    <Button icon={<InboxOutlined />} onClick={() => showInfoModal(cron)}>Response</Button>
                </Space>
            )
        }
    ];

    return (
        <>
            <div className="tabled">
                <Row>
                    <Col sm={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title={`Logs from: ${id}`}
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={logList}
                                    className="ant-border-space"
                                    rowKey="_id"
                                    loading={loading}
                                    size='small'
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Logs;