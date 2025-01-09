import type { RootModal } from "@/lib/types";
import { Modal } from "antd";

const RootModal = ({ title, isModalOpen, children, onCancel }: RootModal) => {
  return (
    <Modal
      centered
      destroyOnClose={true}
      title={title}
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
      {children}
    </Modal>
  );
};

export default RootModal;
