import AvatarUser from "@/components/common/AvatarUser";
import { Avatar } from "antd";
import { useSession } from "next-auth/react";

const DrawerTitle = () => {
  const { data: session }: any = useSession();

  return (
    <div className="flex gap-2 justify-end items-center">
      <AvatarUser
        size="default"
        level={session?.user?.vip_level}
        src={session?.user?.avatar}
      />
      <div className="flex flex-col">
        <span className="text-base">{session?.user?.name}</span>
        <span className="text-sm text-gray-500">{session?.user?.email}</span>
      </div>
    </div>
  );
};

export default DrawerTitle;
