"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, message } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AvatarUser = () => {
  const router = useRouter();

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "0":
        router.push("/trang-ca-nhan");
        break;
      case "1":
        message.info("Mở cài đặt");
        break;
      case "2":
        signOut({ callbackUrl: "/" });
        message.success("Đăng xuất tài khoản thành công!");
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Trang cá nhân",
      key: "0",
    },
    {
      label: "Cài đặt",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Đăng xuất",
      key: "2",
    },
  ];

  const menuProps = {
    items,
    onClick: handleClickMenu,
  };

  const { data: session } = useSession();

  return (
    <Dropdown menu={menuProps} trigger={["click"]}>
      {session?.user?.image ? (
        <Avatar src={<img src={session?.user?.image} alt="avatar" />} />
      ) : (
        <Avatar size="default" shape="square" icon={<UserOutlined />} />
      )}
    </Dropdown>
  );
};

export default AvatarUser;
