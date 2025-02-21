"use client";

import EmptyData from "../common/EmptyData";
import Link from "next/link";
import { ListUserProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import { Col, Row, Tooltip } from "antd";
import AvatarUser from "../common/AvatarUser";

const ListUser = ({ users, criterion, showFrame, type }: ListUserProps) => {
  const { data: session }: any = useSession();

  if (users?.length === 0) {
    return (
      <EmptyData description="Không có ai xếp hạng à? Thời cơ tỏa sáng đây rồi! 🌟" />
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {users?.map((item, index: number) => (
        <Col key={index} xs={24} sm={12}>
          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold w-3">{index + 1}</h3>
            <AvatarUser
              size="default"
              number={item?.vip_level ?? index + 1}
              avatar={item?.avatar ?? "/images/avatar.jpg"}
              showFrame={showFrame}
              type={type as "vip" | "top"}
            />
            <div className="flex items-start gap-1">
              <div className={`flex flex-col gap-1`}>
                <Tooltip title="Xem trang cá nhân">
                  <Link
                    href={`/trang-ca-nhan/${item?.user_id}`}
                    className={`font-semibold text-sm
                    ${
                      session?.user?.id === item?.user_id
                        ? "text-[#13c2c2]"
                        : "text-black"
                    }
                      `}
                  >
                    {session?.user?.id === item?.user_id
                      ? `${item?.username}`
                      : item?.username}
                  </Link>
                </Tooltip>
                {criterion === "vip_level" && (
                  <span className="text-sm text-gray-500">
                    {item?.nickname} - Vip {item?.vip_level}
                  </span>
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
