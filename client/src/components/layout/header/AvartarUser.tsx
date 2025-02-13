"use client";

import { setShowDrawerUser } from "@/store/slices/systemSlice";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { Avatar } from "antd";

const AvartarUser = () => {
  const dispatch = useDispatch();
  const { data: session }: any = useSession();

  return (
    <div
      className="cursor-pointer rounded-full border border-gray-200 relative"
      onClick={() => dispatch(setShowDrawerUser(true))}
    >
      <Avatar
        src={
          <img
            src={session?.user?.image ?? "/images/avatar.jpg"}
            alt="avatar"
          />
        }
      />
    </div>
  );
};

export default AvartarUser;
