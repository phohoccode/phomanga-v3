"use client";

const CommentWrote = ({ item }: any) => {
  return (
    <span className="text-xs text-gray-700">
      Bình luận đã viết: {item?.total_comments}
    </span>
  );
};

export default CommentWrote;
