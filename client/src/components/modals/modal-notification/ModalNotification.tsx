"use client";

import RootModal from "../RootModal";
import { message, Tabs } from "antd";
import type { TabsProps } from "antd";
import SystemNotification from "./SystemNotifcation";
import UserNotification from "./UserNotification";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

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

    // Show user notification if user is logged in
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
      title="Thông báo"
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </RootModal>
  );
};

export default ModalNotification;
