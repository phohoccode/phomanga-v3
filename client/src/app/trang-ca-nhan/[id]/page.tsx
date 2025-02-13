import EmptyData from "@/components/common/EmptyData";
import Layout from "@/components/layout/Layout";
import Statistical from "@/components/pages/proflie/Statistical";
import UserInfo from "@/components/pages/proflie/UserInfo";
import { getAllVipLevel, getUserInfo, getUserStatistical } from "@/lib/actions";
import Link from "next/link";
import { Breadcrumb, Col, Row } from "antd";

const Page = async ({ params }: any) => {
  const _params = await params;
  const responseUserInfo = await getUserInfo(_params.id);
  const responseUserStatistical = await getUserStatistical(_params.id);
  const responseVipLevels = await getAllVipLevel();
  const dataUserInfo = responseUserInfo?.user;
  const dataUserStatistical = responseUserStatistical?.statistical;
  const dataVipLevels = responseVipLevels?.data?.items;
  const breadCrumb = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Trang cá nhân" },
    { title: dataUserInfo?.username },
  ];

  if (!dataUserInfo || !dataUserStatistical) {
    return <EmptyData description="Không tìm thấy thông tin người dùng" />;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-7">
        <Breadcrumb items={breadCrumb} />

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
                src={dataUserInfo?.avatar ?? "/images/avatar.jpg"}
                alt="avatar"
                className="w-32 h-32 "
              />
            </div>
          </div>
          <Row gutter={[32, 32]}>
            <Col
              xs={24}
              sm={20}
              md={16}
              lg={14}
              xl={10}
              xxl={8}
              className="ml-auto mr-auto"
            >
              <Statistical data={dataUserStatistical} />
            </Col>
            <Col xs={24} lg={24}>
              <UserInfo
                dataUserInfo={dataUserInfo}
                dataVipLevels={dataVipLevels}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
