"use client";

import { Image } from "antd";
import { useSession } from "next-auth/react";

const AvatarUser = () => {
  const { data: session }: any = useSession();

  return (
    <div
      className={`
        w-32 absolute lg:-bottom-16 lg:left-[16%] -bottom-16
        left-[50%] -translate-x-1/2 h-32 border-[3px] 
        border-[#ccc] rounded-full overflow-hidden
      `}
    >
      <Image
        src={session?.user?.avatar ?? "/images/avatar.jpg"}
        alt="avatar"
        width={128}
        preview={true}
        placeholder={true}
        height={128}
      />
    </div>
  );
};

export default AvatarUser;
