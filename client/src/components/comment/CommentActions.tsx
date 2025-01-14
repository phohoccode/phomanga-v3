import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button } from "antd";

const CommentActions = () => {
  return (
    <div className="flex gap-2">
      <Button type="text" size="small" icon={<LikeOutlined />}>
        25
      </Button>
      <Button type="text" size="small" icon={<DislikeOutlined />}>
        3
      </Button>
    </div>
  );
};

export default CommentActions;
