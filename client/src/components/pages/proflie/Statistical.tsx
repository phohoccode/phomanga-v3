"use client";

import { BookOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import "@/assets/styles/border-animation.css";

const Statistical = ({ data }: any) => {
  return (
    <div className="border-animation lg:p-6 p-2">
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="Chương đã xem"
            value={data?.total_viewed_comic ?? 0}
            prefix={<EyeOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Bình luận đã viết"
            value={data?.total_comments ?? 0}
            prefix={<EditOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Truyện đã lưu"
            value={data?.total_saved_comic ?? 0}
            prefix={<BookOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Statistical;
