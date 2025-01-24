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

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    socket.on("refreshNotifications", (res) => {
      message.success(res?.message);
    });

    return () => {
      socket.off("refreshNotifications");
    };
  }, []);

  useEffect(() => {
    socket.on("refreshNotifications", (res) => {
      message.success(res?.message);
    });

    socket.on("newNotification", (res) => {
      console.log(res);
      console.log(session);
      if (res?.userLikedId !== session?.user?.id) {
        message.success(res?.message);
      }
    });

    return () => {
      socket.off("refreshNotifications");
      socket.off("newNotification");
    };
  }, []);

  return (
    <RootModal
      footer={null}
      title="Thông báo"
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </RootModal>
  );
};

export default ModalNotification;
