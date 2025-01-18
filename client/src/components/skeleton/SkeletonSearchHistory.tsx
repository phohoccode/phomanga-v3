"use client";

import { Skeleton } from "antd";

const SkeletonSearchHistory = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton.Input className="w-full" />
      <Skeleton.Input className="w-full" />
      <Skeleton.Input className="w-full" />
    </div>
  );
};

export default SkeletonSearchHistory;
