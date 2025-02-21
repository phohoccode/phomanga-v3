"use client";

import { Col, Divider, Row, Skeleton } from "antd";

const SkeletonRankings = () => {
  return (
    <div className="flex flex-col gap-4">
      <Divider orientation="center">
        <Skeleton.Input style={{ width: 200, height: 16 }} />
      </Divider>
      <Row gutter={[24, 24]}>
        {[...Array(6)].map((_, index) => (
          <Col key={index} xs={24} sm={12}>
            <div className="flex gap-2">
              <Skeleton.Avatar size="large" />
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton.Input style={{ width: "20%", height: 16 }} />
                <Skeleton.Input style={{ width: "60%", height: 16 }} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SkeletonRankings;
