"use client";

import CommentFilter from "./CommentFilter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Skeleton } from "antd";

const CommentTitle = () => {
  const { totalItems, loading } = useSelector(
    (state: RootState) => state.comment
  );

  return (
    <div className="flex justify-between flex-wrap gap-2 items-center my-6 rounded-md p-3 bg-gray-100">
      {loading ? (
        <Skeleton.Input style={{ width: 120, height: 18 }} />
      ) : (
        <span className="text-base font-medium">
          {totalItems ?? 0} bình luận
        </span>
      )}

      {totalItems >= 2 && <CommentFilter />}
    </div>
  );
};

export default CommentTitle;
