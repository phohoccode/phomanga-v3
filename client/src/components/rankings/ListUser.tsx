"use client";

import { Avatar, Col, Row, Tag, Tooltip } from "antd";
import EmptyData from "../common/EmptyData";
import Link from "next/link";
import { getColorVipLevel } from "@/lib/utils";
import { ListUserProps } from "@/lib/types";

const ListUser = ({ users, criterion }: ListUserProps) => {
  if (users?.length === 0) {
    return (
      <EmptyData description="Không có ai xếp hạng à? Thời cơ tỏa sáng đây rồi! 🌟" />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {users?.map((item, index: number) => (
        <Col key={index} xs={24} sm={12}>
          <div className="flex gap-2">
            <h3 className="text-lg font-semibold">{index + 1}</h3>
            <Avatar
              size="large"
              src={item?.avatar ?? "/images/avatar.jpg"}
              alt="avatar"
            />
            <div className="flex items-start gap-1">
              <div
                className={`flex ${
                  criterion === "vip_level" ? "flex-row" : "flex-col"
                }`}
              >
                <Tooltip title="Xem trang cá nhân">
                  <Link
                    href={`/trang-ca-nhan/${item?.user_id}`}
                    className="font-semibold text-sm"
                  >
                    {item?.username}
                  </Link>
                </Tooltip>
                {criterion === "vip_level" && (
                  <Tag
                    className="ml-2"
                    color={getColorVipLevel(item?.vip_level as number)}
                  >
                    Vip {item?.vip_level}
                  </Tag>
                )}
                {criterion === "comment_wrote" && (
                  <span className="text-sm text-gray-500">
                    {item?.quantity} bình luận
                  </span>
                )}
                {criterion === "saved_comic" && (
                  <span className="text-sm text-gray-500">
                    {item?.quantity} truyện
                  </span>
                )}
                {criterion === "number_of_stories_read" && (
                  <span className="text-sm text-gray-500">
                    {item?.quantity} truyện
                  </span>
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
