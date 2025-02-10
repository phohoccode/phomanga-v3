"use client";

import { Avatar, Col, Row, Tooltip } from "antd";
import EmptyData from "../common/EmptyData";
import Link from "next/link";
import VipLevel from "./VipLevel";
import CommentWrote from "./CommentWrote";

const ListUser = ({ data }: any) => {
  if (data?.length === 0) {
    return (
      <EmptyData description="Không có ai xếp hạng à? Thời cơ tỏa sáng đây rồi! 🌟" />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {data?.users?.map((item: any, index: number) => (
        <Col key={index} xs={24} sm={12}>
          <div className="flex gap-2">
            <h3 className="text-lg font-semibold">{index + 1}</h3>
            <Avatar
              size="large"
              src={item?.avatar ?? "/images/avatar.jpg"}
              alt="avatar"
            />
            <div className="flex flex-col justify-start gap-1">
              <div className="flex gap-2 items-center">
                <Tooltip title="Xem trang cá nhân">
                  <Link
                    href={`/trang-ca-nhan/${item?.user_id}`}
                    className="font-semibold text-sm"
                  >
                    {item?.username}
                  </Link>
                </Tooltip>
                {data?.criterion === "vip_level" && (
                  <VipLevel
                    item={{
                      vip_level: item?.vip_level,
                    }}
                  />
                )}
                {data?.criterion === "comment_wrote" && (
                  <CommentWrote
                    item={{
                      total_comments: item?.total_comments,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ListUser;
