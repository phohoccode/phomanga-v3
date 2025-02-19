"use client";

import { socket } from "@/lib/socket";
import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DisplayNotification = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    socket.on("refresh-notifications", (res) => {
      if (res?.action === "new-notification") {
        message.info(res?.message);
      }
    });

    // kiểm tra xem user đang đăng nhập có phải là người nhận thông báo không
    socket.on("new-notification", (res) => {
      if (res?.userCommentId === session?.user?.id) {
        message.info(res?.message);
      }

      if (res?.userId === session?.user?.id) {
        message.info(res?.message);
      }
    });

    return () => {
      socket.off("refresh-notifications");
      socket.off("new-notification");
    };
  }, [session]);

  return <>{children}</>;
};

export default DisplayNotification;
