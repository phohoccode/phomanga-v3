import { Col, Divider, Row, Skeleton } from "antd";

const SkeletonInfoPage = () => {
  return (
    <div className="p-6">
      <Skeleton.Input size="small" style={{ width: "260px" }} />

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col lg={24} xl={18}>
          <div className="flex flex-col lg:flex-row gap-8 w-full mb-8">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Skeleton.Node style={{ width: "200px", height: "260px" }} />
              <div className="flex gap-2 w-full justify-center">
                <Skeleton.Button />
                <Skeleton.Button />
                <Skeleton.Button />
              </div>
            </div>

            <Skeleton />
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Divider orientation="center">
              <Skeleton.Input
                style={{ width: "120px"}}
                size="small"
              />
            </Divider>

            <Skeleton.Input style={{ width: "100%" }} />

            <Row gutter={[16, 16]}>
              {[...Array(36)].map((_, index) => (
                <Col key={index} xs={8} sm={6} md={4} lg={3} xxl={2}>
                  <Skeleton.Button
                    style={{ width: "100%", height: "32px" }}
                    className="w-full h-full"
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col lg={24} xl={6}>
          <div className="flex flex-col gap-2">
            <Divider style={{ marginTop: 0 }} orientation="center">
              <Skeleton.Input style={{ width: "120px" }} size="small" />
            </Divider>
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, index: number) => (
                <div key={index} className="flex gap-2">
                  <figure className="w-24 h-32 rounded-md overflow-hidden border border-gray-200">
                    <Skeleton.Node style={{ width: "96px", height: "128px" }} />
                  </figure>
                  <div className="flex flex-col gap-1 flex-1">
                    <Skeleton.Input
                      style={{ width: "30%", height: "12px" }}
                      size="small"
                    />
                    <Skeleton.Input
                      style={{ width: "50%", height: "12px" }}
                      size="small"
                    />
                    <Skeleton.Input
                      style={{ width: "40%", height: "12px" }}
                      size="small"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SkeletonInfoPage;
