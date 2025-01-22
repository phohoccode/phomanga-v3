"use client";

import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Divider } from "antd";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import ModalSearch from "@/components/modals/modal-search/ModalSearch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  setShowModalCategorys,
  setShowModalNotification,
  setShowModalSearch,
  setWidth,
} from "@/store/slices/systemSlice";
import DrawerUser from "./DrawerUser";
import AvartarUser from "./AvartarUser";
import ModalCategorys from "@/components/modals/ModalCategorys";
import ButtonLink from "@/components/common/ButtonLink";
import ModalNotifycation from "@/components/modals/ModalNotifycation";

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
  const showModalNotification = useSelector(
    (state: RootState) => state.system.showModalNotification
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

  if (
    pathHideNavBar.includes(pathname) ||
    pathname.startsWith("/bang-dieu-khien")
  )
    return null;

  return (
    <>
      <header className="header sticky top-0 left-0 z-[999] right-0 md:p-6 p-3 flex items-center justify-between bg-[#fffc] backdrop-blur border-b border-[#f2f2f2] h-[48px]">
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
          {width > 1024 && (
            <Button
              style={{ backgroundColor: "transparent" }}
              onClick={() => dispatch(setShowModalSearch(true))}
              icon={<SearchOutlined />}
            >
              Tìm kiếm truyện tranh ...
            </Button>
          )}

          {width > 1024 && (
            <>
              <Button
                style={{ backgroundColor: "transparent" }}
                onClick={() => dispatch(setShowModalNotification(true))}
                icon={<BellOutlined />}
              />
            </>
          )}

          {!session ? (
            <div className="flex gap-4 items-center ">
              <ButtonLink
                href="/auth/sign-in"
                text="Đăng nhập"
                color="cyan"
                variant="solid"
              />

              <ButtonLink
                href="/auth/sign-up"
                text="Đăng ký"
                color="cyan"
                variant="outlined"
              />
            </div>
          ) : (
            <AvartarUser />
          )}
        </div>
      </header>

      <DrawerUser />

      <ModalSearch
        isModalOpen={showModalSearch}
        onCancel={handleCloseModalSearch}
      />

      <ModalCategorys
        isModalOpen={showModalCategorys}
        onCancel={handleCloseModalCategorys}
      />

      <ModalNotifycation
        isModalOpen={showModalNotification}
        onCancel={() => dispatch(setShowModalNotification(false))}
      />
    </>
  );
};

export default NavBar;
