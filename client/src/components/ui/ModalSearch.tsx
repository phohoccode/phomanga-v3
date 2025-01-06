import { Modal } from "antd";

const ModalSearch = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <Modal
      centered
      title="Tìm kiếm truyện tranh"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <p>Modal Search</p>
    </Modal>
  );
};

export default ModalSearch;
