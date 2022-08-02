import { Layout, Row, Col } from "antd";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            Top Gun Lab Final Project
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a
                  href="https://www.linkedin.com/in/carusoangelo/"
                  className="nav-link text-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  Angelo Caruso
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.linkedin.com/in/andy-arias-360078126/"
                  className="nav-link text-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  Andy Arias
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
