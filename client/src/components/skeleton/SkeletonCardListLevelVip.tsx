"use client ";

import { Card, Col, Row, Skeleton } from "antd";

const SkeletonCardListLevelVip = () => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
      {[...Array(6)].map((_, index) => (
        <Col key={index} xs={24} md={12}>
          <Card className="text-center" title={<Skeleton.Input style={{ width: 120, height: 26 }} />}>
            <div className="flex justify-between gap-2">
              <span className="font-semibold text-[#13c2c2]">
                Truyện lưu trữ
              </span>
              <Skeleton.Input style={{ width: 100, height: 16 }} />
            </div>
            <div className="flex justify-between gap-2">
              <span className="font-semibold text-[#13c2c2]">
                Tiền nâng cấp
              </span>
              <Skeleton.Input style={{ width: 100, height: 16 }} />
            </div>
          </Card>
        </Col>
      ))}
      ;
    </Row>
  );
};

export default SkeletonCardListLevelVip;
