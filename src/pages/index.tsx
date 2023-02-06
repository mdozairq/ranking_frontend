import React from 'react';
import { Layout, Space, Alert, Dropdown } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import RankForm from '@/components/RankForm';
import type { MenuProps } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: "Batch 2019, 6th Semester"
  },
]

const headerStyle: React.CSSProperties = {
  fontFamily: "fantasy",
  textAlign: 'center',
  color: '#000',
  paddingTop: 4,
  backgroundColor: '#81BEF7',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height: '80vh',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  overflowY: "scroll"
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#808080',
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: "column"
};

const Home: React.FC = () => (
  <div style={{ width: '100%' }}>
    <Layout>
      <Header style={headerStyle}>
        <h2>Your Rankers</h2>
      </Header>
      <Content style={contentStyle}>
        <div 
        style={{
          margin: 24,
          padding: 20,
          background: "#fff",
          width: "360px",
          display: "flex-box",
          justifySelf: "center",
          justifyItems: "left"
        }}>
          <Dropdown menu={{ items }}>
            <Space style={{ background: "#81BEE0", borderRadius: "5px", padding: "6px" }}>
              Batch 2019, 6th Semester
              <DownOutlined />
            </Space>
          </Dropdown>
          <hr />
          <RankForm />
        </div>
        <Alert
          message="Disclaimer: This website provides educational info for informational purposes only and is not affiliated with Aryabhatta Knowledge University. Data used for student ranking is from public sources and not intended for commercial or unfair use. Website owner and contributors aren't responsible for accuracy of information provided. The rank is calculated on the basis of overall cgpa."
          type="info"
          style={{ width: "auto", textAlign: "left", padding: 20, margin: 24 }}
        />
      </Content>
      <Footer style={footerStyle}>
        <p>{"Developed by Ozair"} | <a href='https://www.linkedin.com/in/md-ozair-qayam-6265b9178/'>LinkedIn</a></p>
      </Footer>
    </Layout>
  </div>
);

export default Home;