import { Layout, Menu, Card } from 'antd';
import React from 'react';
const { Header, Content, Footer } = Layout;

function Home() {
    return (
        <>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <h1 className='white-text'>CRON MANAGER</h1>
                </Header>
                <Content className="site-layout" style={{ padding: '0 200px', marginTop: 100 }}>
                    <Card>
                        
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