import { Row, Col, Breadcrumb, Dropdown, Menu, Space, Button } from "antd";

import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/user/index.js";
import { getCookie } from '../../utils/cookies.js'

function Header({ name, subName }) {
    const navigate = useNavigate();

    const logout = () => {
        logoutUser();
        navigate(`/login`);
        return;
    }

    const menu = (
        <Menu
            items={[
                {
                    label: 'Logout',
                    key: '0',
                    danger: true,
                    onClick: logout
                }
            ]}
        />
    );

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col span={24} md={6}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <NavLink to="/">Pages</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
                            {name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="ant-page-header-heading">
                        <span
                            className="ant-page-header-heading-title"
                            style={{ textTransform: "capitalize" }}
                        >
                            {subName}
                        </span>
                    </div>
                </Col>
                <Col span={24} md={18} className="header-control">
                    <Dropdown overlay={menu}>
                        <Button>
                            <Space>
                                {getCookie('user')}
                            </Space>
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
        </>
    );
}

export default Header;
