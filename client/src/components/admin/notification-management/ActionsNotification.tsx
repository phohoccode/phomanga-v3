import { Button, Space, Modal } from "antd";

const { confirm } = Modal;

const ActionsNotification = ({
  loading,
  handleDelete,
  handleEdit,
}: {
  loading: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
}) => {
  const handleConfirmDelete = () => {
    confirm({
      title: "Xác nhận xóa?",
      content: "Bạn có chắc chắn muốn xóa thông báo này?",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleDelete();
      },
    });
  };

  return (
    <Space>
      <Button onClick={handleEdit} type="primary">
        Sửa
      </Button>
      <Button
        loading={loading}
        danger
        onClick={handleConfirmDelete}
        type="primary"
      >
        Xóa
      </Button>
    </Space>
  );
};

export default ActionsNotification;
