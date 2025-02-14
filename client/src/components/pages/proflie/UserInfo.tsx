"use client";

import React, { useEffect } from "react";
import { formatDate, getColorVipLevel } from "@/lib/utils";
import UpgradeLevelVip from "./button/UpgradeLevelVip";
import DescriptionTitle from "@/components/common/DescriptionTitle";
import { UserOutlined } from "@ant-design/icons";
import { DescriptionsProps, Skeleton, Descriptions, Tag } from "antd";

export interface UserInfoProps {
  dataUserInfo: {
    avatar: string;
    created_at: string;
    email: string;
    max_stories: number | string;
    role_name: "admin" | "user";
    type_account: "google" | "credentials";
    user_id: string;
    username: string;
    vip_level: number | string;
    nickname: string;
  };
  dataVipLevels: any;
}

const UserInfo = ({ dataUserInfo, dataVipLevels }: UserInfoProps) => {
  const vipLevelMax = dataVipLevels[dataVipLevels.length - 1].level;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên độc giả",
      children: dataUserInfo ? (
        dataUserInfo?.username
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "2",
      label: "Email",
      children: dataUserInfo ? (
        dataUserInfo?.email
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex justify-between gap-2 items-center">
          <span>
            {dataUserInfo?.vip_level !== vipLevelMax
              ? "Cấp độ VIP"
              : "Cấp độ VIP (Max cấp độ)"}
          </span>
          {dataUserInfo?.vip_level !== vipLevelMax && <UpgradeLevelVip />}
        </div>
      ),
      children: dataUserInfo ? (
        <Tag color={getColorVipLevel(dataUserInfo?.vip_level)}>
          Vip {dataUserInfo?.vip_level}
        </Tag>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "4",
      label: "Biệt danh",
      children: dataUserInfo ? (
        dataUserInfo?.nickname
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "5",
      label: "Kho lưu trữ",
      children: dataUserInfo ? (
        dataUserInfo?.max_stories
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "6",
      label: "Thời gian tham gia",
      children: dataUserInfo ? (
        formatDate(dataUserInfo?.created_at)
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      <Descriptions
        size="middle"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 6, xxl: 6 }}
        bordered
        title={
          <DescriptionTitle title="Thông tin độc giả" icon={<UserOutlined />} />
        }
        layout="vertical"
        items={items}
      />
    </div>
  );
};

export default UserInfo;
