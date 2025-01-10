"use client";

import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "antd";
import { BellOutlined, SearchOutlined, SunOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import ModalSearch from "@/components/modals/ModalSearch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  setShowModalCategorys,
  setShowModalSearch,
  setWidth,
} from "@/store/slices/systemSlice";
import DrawerUser from "./DrawerUser";
import AvartarUser from "./AvartarUser";
import ModalCategorys from "@/components/modals/ModalCategorys";
import ButtonLink from "@/components/common/ButtonLink";

const links = [
  { href: "/", label: "Trang chủ" },
  {
    href: "/chi-tiet/danh-sach/truyen-moi",
    label: "Truyện mới",
  },
  { href: "#", label: "Thể loại" },
];

export const pathHideNavBar = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
];

const NavBar = () => {
  const pathname = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const width = useSelector((state: RootState) => state.system.width);
  const showModalCategorys = useSelector(
    (state: RootState) => state.system.showModalCategorys
  );
  const showModalSearch = useSelector(
    (state: RootState) => state.system.showModalSearch
  );

  useEffect(() => {
    dispatch(setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(setWidth(window.innerWidth));

      const handleResize = () => dispatch(setWidth(window.innerWidth));
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleCloseModalSearch = () => dispatch(setShowModalSearch(false));
  const handleCloseModalCategorys = () =>
    dispatch(setShowModalCategorys(false));

  if (pathHideNavBar.includes(pathname)) return null;

  return (
    <>
      <div className="sticky top-0 left-0 z-[999] right-0 p-6 flex items-center justify-between bg-white border-b border-[#f2f2f2] h-[50px]">
        <div className="flex items-center">
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              className="text-[#13c2c2] font-bold mr-[24px] xl:text-lg text-base"
            >
              PHOMANGA-V3
            </Link>
          </div>
          {width > 1024 && (
            <ul className="flex space-x-4 items-center">
              {links.map(({ href, label }, index) => {
                return (
                  <li
                    key={href}
                    onClick={() => {
                      if (href === "#") {
                        dispatch(setShowModalCategorys(true));
                      }
                    }}
                  >
                    <Link
                      href={href}
                      className={`p-2 h-[50px]
                         hover:bg-slate-100 gap-1 text-base flex items-center 
                         ${
                           pathname === href &&
                           "text-[#13c2c2] border-b-2 border-[#13c2c2]"
                         }`}
                    >
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {width > 1024 && (
            <Button
              onClick={() => dispatch(setShowModalSearch(true))}
              icon={<SearchOutlined />}
            >
              Tìm kiếm truyện tranh
            </Button>
          )}

          <ThemeModeSwitch />

          {width > 1024 && <Button icon={<BellOutlined />} />}

          {!session ? (
            <ButtonLink
              href="/auth/sign-in"
              text="Đăng nhập"
              color="cyan"
              variant="solid"
            />
          ) : (
            <AvartarUser />
          )}
        </div>
      </div>

      <DrawerUser />
      <ModalSearch
        isModalOpen={showModalSearch}
        onCancel={handleCloseModalSearch}
      />
      <ModalCategorys
        isModalOpen={showModalCategorys}
        onCancel={handleCloseModalCategorys}
      />
    </>
  );
};

export default NavBar;

const ThemeModeSwitch = () => {
  return <Button icon={<SunOutlined />} />;
};
