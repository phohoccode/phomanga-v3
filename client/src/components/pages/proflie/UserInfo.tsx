"use client";

import React from "react";
import { Descriptions } from "antd";
import { DescriptionsProps, Skeleton } from "antd";
import { formatDate } from "@/lib/utils";
import UpgradeLevelVip from "./button/UpgradeLevelVip";

interface UserInfoProps {
  data: {
    avatar: string;
    created_at: string;
    email: string;
    max_stories: number | string;
    role_name: "admin" | "user";
    type_account: "google" | "credentials";
    user_id: string;
    username: string;
    vip_level: number | string;
  };
}

const UserInfo = ({ data }: UserInfoProps) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên độc giả",
      children: data ? (
        data?.username
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "2",
      label: "Email",
      children: data ? (
        data?.email
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },

    {
      key: "3",
      label: (
        <div className="flex justify-between gap-2 items-center">
          <span>Cấp độ vip</span>
          <UpgradeLevelVip />
        </div>
      ),
      children: data ? (
        data?.vip_level
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "4",
      label: "Thời gian tham gia",
      children: data ? (
        formatDate(data?.created_at)
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
  ];

  return (
    <Descriptions
      column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 4 }}
      bordered
      title="Thông tin độc giả"
      layout="vertical"
      items={items}
    />
  );
};

export default UserInfo;
