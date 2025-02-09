import { Avatar, Image } from "antd";
import { useSession } from "next-auth/react";

const DrawerTitle = () => {
  const { data: session }: any = useSession();

  return (
    <div className="flex gap-2 justify-end">
      <Avatar
        style={{
          marginTop: "6px",
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
        src={
          <img
            src={session?.user?.image ?? "/images/avatar.jpg"}
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

export default DrawerTitle;
