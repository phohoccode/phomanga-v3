"use client";

import { Avatar } from "antd";
import { useEffect, useState } from "react";

interface AvatarUserProps {
  avatar: string;
  size: "small" | "default" | "large" | number;
  number: number;
  type: "vip" | "top";
  showFrame?: boolean;
}

const AvatarUser = ({
  avatar,
  size,
  number,
  type,
  showFrame = true,
}: AvatarUserProps) => {
  const [srcImageFrame, setSrcImageFrame] = useState<string>("");

  useEffect(() => {
    if (type === "vip") {
      setSrcImageFrame(`/images/frame/vip-ranking/vip-${number}.png`);
    } else if (type === "top") {
      if (number <= 3) {
        setSrcImageFrame(`/images/frame/top-ranking/top-${number}.png`);
      }
    }
  }, [type]);

  return (
    <div className="relative flex justify-center items-center w-14 h-14">
      <Avatar
        className="z-10"
        size={size ?? "default"}
        src={avatar ?? "/images/avatar.jpg"}
        draggable={false}
        alt="avatar"
      />
      {showFrame && srcImageFrame !== "" && (
        <figure
          className={`absolute ${
            type === "vip"
              ? "w-16 h-16 top-[-4px] left-[-4px]"
              : "w-[74px] h-[74px] top-[-6px] left-[-8px]"
          }
          `}
        >
          <img
            src={srcImageFrame}
            alt="frame"
            className="w-full h-full pointer-events-none"
          />
        </figure>
      )}
    </div>
  );
};

export default AvatarUser;
