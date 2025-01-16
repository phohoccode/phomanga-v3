"use client"

import { Col, Row, Skeleton } from "antd";

const SkeletonComicList = ({ quantity = 24}: { quantity?: number }) => {
  return (
    <Row gutter={[16, 16]}>
      {[...Array(quantity)].map((_, index) => (
        <Col
          key={index}
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={3}
          xxl={2}
          className="flex flex-col gap-4"
        >
          <Skeleton.Node
            style={{ width: "100%", height: "240px" }}
            className="w-full h-full"
          />
          <Skeleton.Input style={{ width: "100%" }} size="small"/>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonComicList;
