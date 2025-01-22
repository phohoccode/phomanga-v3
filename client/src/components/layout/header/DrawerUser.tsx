"use client";

import { setShowDrawerUser } from "@/store/slices/systemSlice";
import { RootState } from "@/store/store";
import { Avatar, Divider, Drawer } from "antd";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

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
    },
    {
      href: "/kho-luu-tru",
      label: "Kho lưu trữ",
    },
    {
      href: "/lich-su-da-xem",
      label: "Lịch sử đã xem",
    },
  ];

  const onClose = () => {
    dispatch(setShowDrawerUser(false));
  };

  console.log("session", session);

  return (
    <Drawer
      placement={width > 1024 ? "right" : "bottom"}
      keyboard={true}
      closeIcon={true}
      title={<DrawerTitle />}
      onClose={onClose}
      open={showDrawerUser}
    >
      <ul>
        {links.map(({ href, label }) => (
          <li key={href} onClick={() => dispatch(setShowDrawerUser(false))}>
            <Link
              className={`p-2 flex gap-2 h-[36px] items-center text-base hover:bg-slate-100 rounded-md transition-all ${
                pathname === href
                  ? "text-[#13c2c2] hover:text-[#13c2c2]"
                  : "text-gray-700 hover:text-gray-700"
              }`}
              href={href}
            >
              <span className="text-center">{label}</span>
            </Link>
          </li>
        ))}

        {session?.user?.role === "admin" && (
          <li>
            <Link
              className="p-2 flex gap-2 h-[36px] items-center text-base hover:bg-slate-100 hover:text-gray-700 rounded-md transition-all"
              href="/bang-dieu-khien"
            >
              Bảng điều khiển
            </Link>
          </li>
        )}

        <Divider style={{ margin: "12px 0" }} />

        <li
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer p-2 flex gap-2 h-[36px] items-center text-base hover:bg-slate-100 rounded-md transition-all"
        >
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
