"use client";

import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "antd";
import { SearchOutlined, SunOutlined } from "@ant-design/icons";
import ModalSearch from "./ui/ModalSearch";
import { useState } from "react";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/chi-tiet/danh-sach/truyen-moi", label: "Truyện mới" },
  { href: "/kho-luu-tru", label: "Kho lưu trữ" },
  { href: "/lich-su-da-xem", label: "Lịch sử đã xem" },
];

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => setIsModalOpen(false);


  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <>
      <div className="sticky top-0 left-0 right-0 p-6 flex items-center justify-between bg-white border-b border-[#f2f2f2] h-[60px]">
        <div className="flex items-center">
          <Link href="/" className="text-[#13c2c2] font-bold mr-[32px]">
            PHOFLIX-V3
          </Link>
          <ul className="flex space-x-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`hover:text-[#13c2c2] hover:border-b-1 hover:border-[#13c2c2] transition-all flex h-[60px] items-center ${
                    pathname === href &&
                    "text-[#13c2c2] border-b border-[#13c2c2]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<SearchOutlined />}
            variant="outlined"
            color="cyan"
          >
            Tìm kiếm truyện tranh ...
          </Button>
          <ThemeModeSwitch />
          <div className="w-[1px] h-[24px] bg-[#d9d9d9]"></div>
          <Button
            onClick={() => router.push("/login")}
            color="cyan"
            variant="text"
          >
            Đăng nhập
          </Button>
          <Button
            onClick={() => router.push("/register")}
            color="cyan"
            variant="solid"
          >
            Đăng ký
          </Button>
        </div>
      </div>

      <ModalSearch isModalOpen={isModalOpen} onCancel={handleCloseModal}/>
    </>
  );
};

export default NavBar;

const ThemeModeSwitch = () => {
  return <Button color="cyan" variant="outlined" icon={<SunOutlined />} />;
};
