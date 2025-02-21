"use client";

import { socket } from "@/lib/socket";
import { setDisplayGreetings } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const RefreshSesstion = ({ children }: { children: React.ReactNode }) => {
  const { data: session, update }: any = useSession();
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    socket.on("refresh-sesstion", async (res) => {
      if (session?.user?.id === res?.userId) {
        await update();
        dispatch(setDisplayGreetings(false));
      }

      if (
        pathname === "/kho-luu-tru" ||
        pathname.startsWith("/trang-ca-nhan")
      ) {
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
