"use client";

import RootModal from "../RootModal";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SystemNotification from "./SystemNotifcation";
import UserNotification from "./UserNotification";
import { useSession } from "next-auth/react";
import { NotificationOutlined } from "@ant-design/icons";

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
      label: "Từ hệ thống",
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
          <NotificationOutlined /> Thông báo
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
