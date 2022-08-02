import { Row, Col, Breadcrumb } from "antd";

import { NavLink, Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

function Header({ name, subName }) {
    return (
        <>
            <Row gutter={[24, 0]}>
                <Col span={24} md={6}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <NavLink to="/">Pages</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
                            {name.replace("/", "")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="ant-page-header-heading">
                        <span
                            className="ant-page-header-heading-title"
                            style={{ textTransform: "capitalize" }}
                        >
                            {subName.replace("/", "")}
                        </span>
                    </div>
                </Col>
                <Col span={24} md={18} className="header-control">
                    <Link to="/sign-in" className="btn-sign-in">
                        <UserOutlined />
                        <span>Profile</span>
                    </Link>
                </Col>
            </Row>
        </>
    );
}

export default Header;
