import { Row, Col, Breadcrumb, Dropdown, Menu, Space, Button  } from "antd";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserOutlined, DownOutlined  } from "@ant-design/icons";
import { getCookie, deleteCookie } from '../../utils/cookies.js'

function Header({ name, subName }) {
    const navigate = useNavigate();
    const logout = ()=>{
        console.log('hola');
        
        deleteCookie('jwt');
         navigate('/login');
         return;
    }
    const menu = (
        <Menu
            items={[
                {
                    label:<a href="#"  onClick={logout}>logout</a> ,
                    key: '0',
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

                    {getCookie('jwt') ?
                          <Dropdown overlay={menu} trigger={['click']}>
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                            <UserOutlined /> Account
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                        :
                        <Link to="/sign-in" className="btn-sign-in">
                            <UserOutlined />
                            <span>Profile</span>
                        </Link>}
                </Col>
            </Row>
        </>
    );
}

export default Header;
