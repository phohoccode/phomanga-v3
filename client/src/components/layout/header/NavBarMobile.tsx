"use client";

import {
  setShowModalCategorys,
  setShowModalSearch,
} from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  AppstoreOutlined,
  BellOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pathHideNavBar } from "./NavBar";
import { usePathname } from "next/navigation";
import ComicIcon from "@/components/icons/ComicIcon";

const links = [
  { href: "/", label: "Trang chủ", icon: <HomeOutlined /> },
  {
    href: "/chi-tiet/danh-sach/truyen-moi",
    label: "Truyện mới",
    icon: <ComicIcon width="24" height="24" />,
  },
  {
    href: "#",
    label: "Tìm kiếm",
    icon: <SearchOutlined />,
  },
  {
    href: "#",
    label: "Thông báo",
    icon: <BellOutlined />,
  },
  {
    href: "#",
    label: "Thể loại",
    icon: <AppstoreOutlined />,
  },
];

const NavBarMobile = () => {
  const [width, setWidth] = useState<number>(1025);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleChangeTab = (index: number) => {
    setCurrentIndex(index);
    if (index === 2) {
      dispatch(setShowModalSearch(true));
    } else if (index === 4) {
      dispatch(setShowModalCategorys(true));
    }
  };

  if (width > 1024) return null;
  if (pathHideNavBar.includes(pathname)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 flex items-center justify-between bg-white border-t border-[#f2f2f2] h-[60px]">
      <ul className="flex space-x-4 max-w-3xl mx-auto w-[768px]">
        {links?.map(({ href, label, icon }, index) => (
          <li
            onClick={() => handleChangeTab(index)}
            className="flex-auto "
            key={index}
          >
            <Link
              href={href}
              className={`text-lg flex flex-col gap-2 justify-center items-center h-[60px] hover:text-[#13c2c2] transition-all ${
                index === currentIndex ? "text-[#13c2c2]" : "text-[#333]"
              }`}
            >
              {icon}
              <span className="text-xs">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBarMobile;
