"use client";

import React from "react";
import { Descriptions } from "antd";
import { DescriptionsProps, Skeleton } from "antd";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session }: any = useSession();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên người dùng",
      children: session ? (
        session?.user?.name
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} active />
      ),
    },
    {
      key: "2",
      label: "Email",
      children: session ? (
        session?.user?.email
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} active />
      ),
    },
    {
      key: "3",
      label: "Id",
      children: session ? (
        session?.user?.id
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} active />
      ),
    },
    {
      key: "4",
      label: "Quyền hạn",
      children: session ? (
        session?.user?.role === "admin" ? (
          "Admin"
        ) : (
          "User"
        )
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} active />
      ),
    },
  ];

  return (
    <Descriptions
      column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
      bordered
      title="Thông tin người dùng"
      layout="vertical"
      items={items}
    />
  );
};

export default UserInfo;
