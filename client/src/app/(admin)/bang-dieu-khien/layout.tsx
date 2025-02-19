import SideBar from "@/components/admin/SideBar";
import Layout from "@/components/layout/Layout";
import { Col, Row } from "antd";

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={24} lg={5}>
          <SideBar />
        </Col>
        <Col xs={24} sm={24} md={24} lg={19}>
          {children}
        </Col>
      </Row>
    </Layout>
  );
};

export default DashBoard;
