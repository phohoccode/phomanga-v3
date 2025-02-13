"use client";

import { socket } from "@/lib/socket";
import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DisplayNotification = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    socket.on("refreshNotifications", (res) => {
      if (res?.action === "new-notification") {
        message.info(res?.message);
      }
    });

    socket.on("newNotification", (res) => {

      // kiểm tra xem user đang đăng nhập có phải là người nhận thông báo không
      if (res?.userCommentId === session?.user?.id) {
        message.info(res?.message);
      }
    });

    return () => {
      socket.off("refreshNotifications");
      socket.off("newNotification");
    };
  }, [session]);

  return <>{children}</>;
};

export default DisplayNotification;
