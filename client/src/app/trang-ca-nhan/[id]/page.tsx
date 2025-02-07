import Layout from "@/components/layout/Layout";
import UserInfo from "@/components/pages/proflie/UserInfo";
import { getUserInfo } from "@/lib/actions";
import { Col, Row } from "antd";

const Page = async ({ params }: any) => {
  const _params = await params;
  const response = await getUserInfo(_params.id);
  const data = response?.user;

  return (
    <Layout>
      <div className="min-h-screen">
        <div
          style={{
            position: "relative",
            backgroundImage: "url('/images/background-profile.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "260px",
            borderRadius: "8px",
            marginBottom: "120px",
          }}
        >
          <div
            className={`absolute lg:-bottom-16 lg:left-[16%] -bottom-16 left-[50%] -translate-x-1/2  border-[3px] border-[#ccc] rounded-full overflow-hidden`}
          >
            <img
              loading="lazy"
              src={data?.avatar ?? "/images/avatar.jpg"}
              alt="avatar"
              className="w-32 h-32 "
            />
          </div>
        </div>
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={14}>
            <UserInfo data={data} />
          </Col>
          <Col xs={24} lg={10}>
            Thống kê
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Page;
