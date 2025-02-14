"use client";

import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AvartarUser from "./AvartarUser";
import SearchComic from "./SearchComic";
import AuthButton from "./AuthButton";
import Notification from "./Notification";
import { Skeleton } from "antd";
import { pathHideNavBar } from "@/lib/defind";

const NavBar = () => {
  const pathname = usePathname();
  const { status } = useSession();
  const { width, isVisiable } = useSelector((state: RootState) => state.system);

  if (
    pathHideNavBar.includes(pathname) ||
    pathname.startsWith("/bang-dieu-khien")
  )
    return null;

  return (
    <header
      className={`header sticky top-0 left-0 z-[999] 
        right-0 md:p-6 p-3 flex items-center
        justify-between bg-[#fffc]
        backdrop-blur border-b border-[#f2f2f2]
        h-[48px] transition-transform duration-300
        ${isVisiable ? "transform-none" : "-translate-y-full"}
      `}
    >
      <div className="flex items-center">
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="text-[#13c2c2] mr-[24px] xl:text-lg text-base"
          >
            PHOMANGA-V3
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {width > 1024 && <SearchComic />}

        {width > 1024 && <Notification />}

        {status === "loading" && <Skeleton.Input style={{ width: 100 }} />}

        {status === "unauthenticated" && <AuthButton />}

        {status === "authenticated" && <AvartarUser />}
      </div>
    </header>
  );
};

export default NavBar;
