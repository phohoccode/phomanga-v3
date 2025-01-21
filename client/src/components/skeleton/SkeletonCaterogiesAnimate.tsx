"use client";

import { Skeleton } from "antd";

const SkeletonCaterogiesAnimate = ({
  quantity = 12,
}: {
  quantity?: number;
}) => {
  return (
    <div className="flex gap-2 overflow-x-hidden my-6">
      {[...Array(quantity)].map((_, index) => (
        <Skeleton.Input key={index} size="large" />
      ))}
    </div>
  );
};

export default SkeletonCaterogiesAnimate;
