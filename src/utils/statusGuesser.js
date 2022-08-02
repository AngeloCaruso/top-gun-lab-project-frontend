import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { Tag } from "antd"

export function getResponseTag(status) {
    if (status >= 200 && status < 300) {
        return <Tag icon={<CheckCircleOutlined />} color="success"> Success </Tag>
    }
    if (status >= 500 && status < 600) {
        return <Tag icon={<CloseCircleOutlined />} color="error"> Error </Tag>
    }

    return <Tag icon={<ExclamationCircleOutlined />} color="warning"> Unusual response </Tag>
}