import { Button, Space } from "antd";

const Actions = ({
  loading,
  handleDelete,
  handleEdit,
}: {
  loading: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
}) => {
  return (
    <Space>
      <Button onClick={handleEdit} type="primary">
        Sửa
      </Button>
      <Button loading={loading} danger onClick={handleDelete} type="primary">
        Xóa
      </Button>
    </Space>
  );
};

export default Actions;
