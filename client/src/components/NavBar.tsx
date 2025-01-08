"use client";

import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Divider, Typography } from "antd";
import { SearchOutlined, SunOutlined } from "@ant-design/icons";
import ModalSearch from "./modals/ModalSearch";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AvatarUser from "./AvatarUser";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/chi-tiet/danh-sach/truyen-moi", label: "Truyện mới" },
  { href: "/kho-luu-tru", label: "Kho lưu trữ" },
  { href: "/lich-su-da-xem", label: "Lịch sử đã xem" },
];

const pathHideNavBar = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
];

const pathSessionAvaible = ["/kho-luu-tru", "/lich-su-da-xem"];

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log(">>> session", session);
  }, [session]);

  const handleCloseModal = () => setIsModalOpen(false);

  if (pathHideNavBar.includes(pathname)) return null;

  return (
    <>
      <div className="sticky top-0 left-0 right-0 p-6 flex items-center justify-between bg-white border-b border-[#f2f2f2] h-[60px]">
        <div className="flex items-center">
          <div className="flex gap-4 items-center">
            {width < 1024 && (
              <Button
                icon={
                  <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="octicon octicon-three-bars Button-visual"
                  >
                    <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                  </svg>
                }
              />
            )}
            {(width > 1024 || session) && (
              <Link href="/" className="text-[#13c2c2] font-bold mr-[32px]">
                PHOFLIX-V3
              </Link>
            )}
          </div>
          {width > 1024 && (
            <ul className="flex space-x-4">
              {links.map(({ href, label }) => {
                if (pathSessionAvaible.includes(href) && !session) return null;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`hover:text-[#13c2c2] hover:border-b hover:border-[#13c2c2] transition-all flex h-[60px] items-center ${
                        pathname === href &&
                        "text-[#13c2c2] border-b border-[#13c2c2]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<SearchOutlined />}
          >
            {width > 1024 && "Tìm kiếm truyện tranh"}
          </Button>
          <ThemeModeSwitch />

          <Divider
            type="vertical"
            style={{ borderInlineColor: "#ccc", height: "24px" }}
          />

          {!session ? (
            <>
              <Button
                type="link"
                onClick={() => router.push("/auth/sign-in")}
                color="cyan"
                variant="solid"
              >
                Đăng nhập
              </Button>
              {width > 1024 && (
                <Button
                  type="link"
                  onClick={() => router.push("/auth/sign-up")}
                  color="cyan"
                  variant="outlined"
                >
                  Đăng ký
                </Button>
              )}
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <Typography.Text>{session?.user?.name}</Typography.Text>
              <AvatarUser />
            </div>
          )}
        </div>
      </div>

      <ModalSearch isModalOpen={isModalOpen} onCancel={handleCloseModal} />
    </>
  );
};

export default NavBar;

const ThemeModeSwitch = () => {
  return <Button icon={<SunOutlined />} />;
};
