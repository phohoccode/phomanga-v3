"use client";

import { Tag } from "antd";
import CommentFilter from "./CommentFilter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CommentTitle = () => {
  const { totalItems } = useSelector((state: RootState) => state.comment);

  return (
    <div className="flex justify-between flex-wrap gap-2 items-center mt-4 rounded-md p-4 bg-gray-100">
      <span className="text-base font-medium">
        Lượt bình luận{" "}
        <Tag color="cyan-inverse" style={{ marginLeft: "8px" }}>
          {totalItems ?? 0}
        </Tag>
      </span>
      {totalItems >= 2 && <CommentFilter />}
    </div>
  );
};

export default CommentTitle;
