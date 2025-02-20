"use client";

import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const RefreshSesstion = ({ children }: { children: React.ReactNode }) => {
  const { data: session, update }: any = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    socket.on("refresh-sesstion", async (res) => {
      if (session?.user?.id === res?.userId) {
        await update();
      }

      if (pathname === "/kho-luu-tru" || pathname.startsWith("/trang-ca-nhan")) {
        router.refresh();
      }
    });

    return () => {
      socket.off("refresh-sesstion");
    };
  }, [session]);

  return <>{children}</>;
};

export default RefreshSesstion;
