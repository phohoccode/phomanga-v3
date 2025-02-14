"use client";

import {
  setShowModalCategorys,
  setShowModalNotification,
  setShowModalSearch,
} from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import {
  AppstoreOutlined,
  BellOutlined,
  HomeOutlined,
  ReadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { pathHideNavBar } from "@/lib/defind";

const links = [
  { href: "/", label: "Trang chủ", icon: <HomeOutlined /> },
  {
    href: "/chi-tiet/danh-sach/truyen-moi",
    label: "Truyện mới",
    icon: <ReadOutlined />,
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const { width, isVisiable } = useSelector((state: RootState) => state.system);

  const handleChangeTab = (index: number) => {
    setCurrentIndex(index);
    if (index === 2) {
      dispatch(setShowModalSearch(true));
    } else if (index === 3) {
      dispatch(setShowModalNotification(true));
    } else if (index === 4) {
      dispatch(setShowModalCategorys(true));
    }
  };

  if (
    width > 1024 ||
    pathHideNavBar.includes(pathname) ||
    pathname.startsWith("/bang-dieu-khien")
  )
    return null;

  return (
    <div
      className={`z-50 fixed left-3 right-3 ${
        !isVisiable ? "bottom-0" : "bottom-3"
      } 
        md:p-6 p-3 flex items-center justify-between rounded-full
        bg-[#fffc] backdrop-blur border border-[#f2f2f2] h-[60px] transition-all duration-300
        ${isVisiable ? "transform-none" : "translate-y-full"}
      `}
    >
      <ul className="flex space-x-1 max-w-3xl mx-auto w-[768px]">
        {links?.map(({ href, label, icon }, index) => (
          <li
            onClick={() => handleChangeTab(index)}
            className="flex-auto"
            key={index}
          >
            <Link
              href={href}
              className={`text-lg flex flex-col gap-1 justify-center
                 items-center p-2 transition-all rounded-full
                 ${
                   index === currentIndex
                     ? "bg-[#13c2c2] text-[#fff]"
                     : "text-[#333]"
                 }`}
            >
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBarMobile;
