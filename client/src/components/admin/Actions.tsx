import { Button, Space } from "antd";

const Actions = ({
  handleEdit,
  handleDelete,
}: {
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}) => {
  return (
    <Space size="middle">
      <Button type="primary">Sửa</Button>
      <Button type="primary" danger>
        Xóa
      </Button>
    </Space>
  );
};

export default Actions;
