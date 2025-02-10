"use client";

import { getColorVipLevel } from "@/lib/utils";
import { Tag } from "antd";

const VipLevel = ({ item }: any) => {
  return (
    <Tag color={getColorVipLevel(item?.vip_level)}>Vip {item?.vip_level}</Tag>
  );
};

export default VipLevel;
