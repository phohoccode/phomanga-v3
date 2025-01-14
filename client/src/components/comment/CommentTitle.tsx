import { Tag, Typography } from "antd";
import CommentFilter from "./CommentFilter";

const CommentTitle = () => {
  return (
    <div className="flex justify-between gap-2 items-center mt-4 rounded-md p-4 bg-gray-50">
      <Typography.Title level={5} style={{ margin: 0 }}>
        Lượt bình luận{" "}
        <Tag color="blue" style={{ marginLeft: "8px" }}>
          123
        </Tag>
      </Typography.Title>
      <CommentFilter />
    </div>
  );
};

export default CommentTitle;
