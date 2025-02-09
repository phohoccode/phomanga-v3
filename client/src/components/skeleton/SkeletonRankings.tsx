"use client";

import { Col, Divider, Row, Skeleton } from "antd";

const SkeletonRankings = () => {
  return (
    <div className="flex flex-col gap-4">
      <Divider orientation="center">
        <Skeleton.Input style={{ width: 200, height: 16 }} />
      </Divider>
      <Row gutter={[16, 16]}>
        {[...Array(4)].map((_, index) => (
          <Col key={index} xs={12}>
            <div className="flex gap-2">
              <Skeleton.Avatar size="large" />

              <div className="flex flex-col gap-1">
                <Skeleton.Input style={{ width: 100, height: 12 }} />
                <Skeleton.Input style={{ width: 100, height: 12 }} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SkeletonRankings;
