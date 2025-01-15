import { DashOutlined, DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: "Xoá bình luận",
    key: "0",
  },
  {
    label: "Sửa bình luận",
    key: "1",
  },
];

const CommentActions = () => {
  return (
    <div className="flex gap-2">
      <Button type="text" size="small" icon={<LikeOutlined />}>
        25
      </Button>
      <Button type="text" size="small" icon={<DislikeOutlined />}>
        3
      </Button>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" size="small" icon={<DashOutlined />} />
      </Dropdown>
    </div>
  );
};

export default CommentActions;
