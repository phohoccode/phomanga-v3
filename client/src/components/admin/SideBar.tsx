"use client";

import {
  CommentOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  {
    label: "Trang chủ",
    href: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Quản lý người dùng",
    href: "/bang-dieu-khien/quan-ly-nguoi-dung",
    icon: <UserOutlined />,
  },
  {
    label: "Quản lý bình luận",
    href: "/bang-dieu-khien/quan-ly-binh-luan",
    icon: <CommentOutlined />,
  },
  {
    label: "Quản lý thông báo",
    href: "/bang-dieu-khien/quan-ly-thong-bao",
    icon: <NotificationOutlined />,
  },
  {
    label: "Quản lý phản hồi",
    href: "/bang-dieu-khien/quan-ly-phan-hoi",
    icon: <NotificationOutlined />,
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4 rounded-xl border bg-gray-50 shadow-lg p-4">
      <div className="min-h-16">
        <h3 className="text-[#13c2c2] font-bold text-lg">PHOMANGA-V3</h3>
      </div>

      <ul className="flex flex-col gap-2">
        {Links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href
                  ? "bg-gray-200 text-[#13c2c2]"
                  : "text-gray-800"
              } font-medium flex items-center gap-3 text-base p-2 rounded-md transition-all hover:bg-gray-200 hover:text-[#13c2c2]`}
            >
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Divider style={{ margin: "12px 0" }} />

      <Link
        onClick={() => signOut({ callbackUrl: "/" })}
        href="#"
        className="mt-auto font-medium text-gray-800 text-base p-2 rounded-md block transition-all hover:bg-gray-200 hover:text-[#13c2c2]"
      >
        <LogoutOutlined style={{ marginRight: "12px" }} />
        Đăng xuất
      </Link>
    </nav>
  );
};

export default SideBar;
