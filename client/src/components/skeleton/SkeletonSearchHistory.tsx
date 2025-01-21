"use client";

import { Skeleton } from "antd";

const SkeletonSearchHistory = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton.Input style={{ width: "120px", height: "12px" }} />
      <Skeleton.Input style={{ width: "220px", height: "12px" }} />
      <Skeleton.Input style={{ width: "80px", height: "12px" }} />
      <Skeleton.Input style={{ width: "170px", height: "12px" }} />
    </div>
  );
};

export default SkeletonSearchHistory;
