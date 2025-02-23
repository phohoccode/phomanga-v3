"use client";

import { setShowDrawerUser } from "@/store/slices/systemSlice";
import { RootState } from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DrawerTitle from "./DrawerTitle";
import { Divider, Drawer } from "antd";
import {
  DashboardOutlined,
  HistoryOutlined,
  InboxOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const DrawerUser = () => {
  const { data: session }: any = useSession();
  const dispatch = useDispatch();
  const showDrawerUser = useSelector(
    (state: RootState) => state.system.showDrawerUser
  );
  const pathname = usePathname();
  const width = useSelector((state: RootState) => state.system.width);

  const links = [
    {
      href: `/trang-ca-nhan/${session?.user?.id}`,
      label: "Trang cá nhân",
      icon: <UserOutlined />,
    },
    {
      href: "/kho-luu-tru",
      label: "Kho lưu trữ",
      icon: <InboxOutlined />,
    },
    {
      href: "/lich-su-da-xem",
      label: "Lịch sử đã xem",
      icon: <HistoryOutlined />,
    },
  ];

  const onClose = () => {
    dispatch(setShowDrawerUser(false));
  };

  return (
    <Drawer
      placement={width > 1024 ? "right" : "bottom"}
      keyboard={true}
      closeIcon={true}
      title={<DrawerTitle />}
      onClose={onClose}
      open={showDrawerUser}
    >
      <ul className="flex flex-col gap-1">
        {links.map(({ href, label, icon }) => (
          <li key={href} onClick={() => dispatch(setShowDrawerUser(false))}>
            <Link
              className={`
                p-2 flex gap-2 h-[36px] text-gray-700 items-center 
                text-base hover:bg-slate-100 rounded-md transition-all 
                ${
                  pathname === href
                    ? "text-gray-900 bg-slate-100"
                    : "text-gray-700 hover:text-gray-700"
                }`}
              href={href}
            >
              {icon}
              <span className="text-center">{label}</span>
            </Link>
          </li>
        ))}

        {session?.user?.role === "admin" && (
          <li onClick={() => dispatch(setShowDrawerUser(false))}>
            <Link
              className="p-2 flex gap-2 h-[36px] items-center text-base hover:bg-slate-100 hover:text-gray-700 rounded-md transition-all"
              href="/bang-dieu-khien/quan-ly-nguoi-dung"
            >
              <DashboardOutlined />
              Bảng điều khiển
            </Link>
          </li>
        )}

        <Divider style={{ margin: "12px 0" }} />

        <li
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer p-2 flex gap-2 h-[36px] items-center text-base hover:bg-slate-100 rounded-md transition-all"
        >
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </li>
      </ul>
    </Drawer>
  );
};

export default DrawerUser;
