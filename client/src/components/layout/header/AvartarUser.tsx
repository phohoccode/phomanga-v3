"use client";

import { setShowDrawerUser } from "@/store/slices/systemSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

const AvartarUser = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  return (
    <div
      className="cursor-pointer rounded-full border border-gray-200" 
      onClick={() => dispatch(setShowDrawerUser(true))}
    >
      {session?.user?.image ? (
        <Avatar src={<img src={session?.user?.image} alt="avatar" />} />
      ) : (
        <Avatar size="default" shape="square" icon={<UserOutlined />} />
      )}
    </div>
  );
};

export default AvartarUser;
