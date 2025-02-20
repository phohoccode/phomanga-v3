"use client";

import { Avatar } from "antd";

interface AvatarUserProps {
  src: string;
  size: "small" | "default" | "large" | number;
  level: number;
  showFrame?: boolean;
}

const AvatarUser = ({
  src,
  size,
  level,
  showFrame = true,
}: AvatarUserProps) => {
  return (
    <div className="relative flex justify-center items-center w-[52px] h-[52px]">
      <Avatar
        size={size ?? "default"}
        src={src ?? "/images/avatar.jpg"}
        draggable={false}
        alt="avatar"
      />
      {showFrame && (
        <img
          src={`/images/rank-frame/vip-${level > 5 ? 1 : level}.png`}
          alt="frame"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
};

export default AvatarUser;
