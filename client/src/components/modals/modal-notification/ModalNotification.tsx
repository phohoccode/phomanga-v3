"use client";

import RootModal from "../RootModal";
import SystemNotification from "./SystemNotifcation";
import UserNotification from "./UserNotification";
import { useSession } from "next-auth/react";
import type { TabsProps } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Tabs } from "antd";

const ModalNotification = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const { data: session } = useSession();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Hệ thống",
      children: <SystemNotification />,
    },

    // Hiển thị khi đã đăng nhập
    ...(session
      ? [
          {
            key: "2",
            label: "Của bạn",
            children: <UserNotification />,
          },
        ]
      : []),
  ];

  return (
    <RootModal
      footer={null}
      title={
        <div className="flex items-center gap-2">
          <BellOutlined /> Thông báo
        </div>
      }
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </RootModal>
  );
};

export default ModalNotification;
