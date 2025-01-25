"use client";

import { socket } from "@/lib/socket";
import { AppDispatch } from "@/store/store";
import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DisplayNotification = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    socket.on("refreshNotifications", (res) => {
      if (res?.action === "new-notification") {
        message.info(res?.message);
      }
    });

    socket.on("newNotification", (res) => {
      if (res?.userLikedId !== session?.user?.id) {
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
