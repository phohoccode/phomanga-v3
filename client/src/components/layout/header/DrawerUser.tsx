"use client";

import ArchiveIcon from "@/components/icons/ArchiveIcon";
import HistoryIcon from "@/components/icons/HistoryIcon";
import PersonIcon from "@/components/icons/PersonIcon";
import SignOutIcon from "@/components/icons/SignoutIcon";
import { setShowDrawerUser } from "@/store/slices/systemSlice";
import { RootState } from "@/store/store";
import { Avatar, Divider, Drawer } from "antd";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const DrawerUser = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const showDrawerUser = useSelector(
    (state: RootState) => state.system.showDrawerUser
  );
  const pathname = usePathname();

  const links = [
    {
      href: `/trang-ca-nhan/${session?.user?.id}`,
      label: "Trang cá nhân",
      icon: <PersonIcon width="22" height="22" />,
    },
    {
      href: "/kho-luu-tru",
      label: "Kho lưu trữ",
      icon: <ArchiveIcon width="18" height="18" />,
    },
    {
      href: "/lich-su-da-xem",
      label: "Lịch sử đã xem",
      icon: <HistoryIcon width="18" height="18" />,
    },
  ];

  const onClose = () => {
    dispatch(setShowDrawerUser(false));
  };

  return (
    <Drawer
      placement="right"
      keyboard={true}
      closeIcon={true}
      title={<DrawerTitle />}
      onClose={onClose}
      open={showDrawerUser}
    >
      <ul>
        {links.map(({ href, label, icon }) => (
          <li key={href} onClick={() => dispatch(setShowDrawerUser(false))}>
            <Link
              className={`p-2 flex gap-2 h-[36px] items-center text-base hover:text-[#13c2c2] hover:bg-slate-100 rounded-md transition-all ${
                pathname === href ? "text-[#13c2c2]" : "text-gray-800"
              }`}
              href={href}
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center">
                {icon}
              </div>
              <span>{label}</span>
            </Link>
          </li>
        ))}
        <Divider style={{ margin: "12px 0" }} />
        <li
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer p-2 flex gap-2 h-[36px] items-center text-base hover:text-[#13c2c2] hover:bg-slate-100 rounded-md transition-all"
        >
          <div className="w-[32px] h-[32px] flex items-center justify-center">
            <SignOutIcon width="18" height="18" />
          </div>
          <span>Đăng xuất</span>
        </li>
      </ul>
    </Drawer>
  );
};

export default DrawerUser;

const DrawerTitle = () => {
  const { data: session } = useSession();

  return (
    <div className="flex gap-2 justify-end">
      <Avatar
        style={{
          marginTop: "6px",
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
        src={
          <Image
            width={32}
            height={32}
            src={(session?.user?.image as string) ?? "/avatar-default.jpg"}
            alt="avatar"
          />
        }
      />
      <div className="flex flex-col">
        <span className="text-base">{session?.user?.name}</span>
        <span className="text-sm text-gray-500">{session?.user?.email}</span>
      </div>
    </div>
  );
};
