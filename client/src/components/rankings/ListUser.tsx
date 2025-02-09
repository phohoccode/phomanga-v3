"use client";

import { Avatar, Col, Row } from "antd";

const ListUser = ({ data }: any) => {
  return (
    <Row gutter={[16, 16]}>
      {data?.users?.map((item: any, index: number) => (
        <Col key={index} xs={24} lg={12}>
          <div className="flex gap-2">
            <h3 className="text-lg font-semibold">{index + 1}</h3>
            <Avatar
              size="large"
              src={item?.avatar ?? "/images/avatar.jpg"}
              alt="avatar"
            />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm">{item?.username}</span>
              {data?.criterion === "vip_level" && (
                <span className="text-xs text-gray-700">
                  Cấp độ Vip: {item?.vip_level}
                </span>
              )}
              {data?.criterion === "comment_wrote" && (
                <span className="text-xs text-gray-700">
                  Bình luận đã viết: {item?.total_comments}
                </span>
              )}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ListUser;
