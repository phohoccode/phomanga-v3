"use client";

import { socket } from "@/lib/socket";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const RefreshData = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    socket.on("refreshNotifications", (res) => {});

    return () => {
      socket.off("refreshNotifications");
    };
  }, [session]);

  return <>{children}</>;
};

export default RefreshData;
