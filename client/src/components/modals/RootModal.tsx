import type { RootModal } from "@/lib/types";
import { Modal } from "antd";

const RootModal = ({
  title,
  isModalOpen,
  children,
  closeIcon,
  footer,
  width,
  onCancel,
  onOk,
}: RootModal) => {
  return (
    <Modal
      centered
      destroyOnClose={true}
      title={title}
      open={isModalOpen}
      onCancel={onCancel}
      onOk={onOk}
      closeIcon={closeIcon}
      footer={footer}
      width={
        width ?? {
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "45%",
          xxl: "40%",
        }
      }
    >
      {children}
    </Modal>
  );
};

export default RootModal;
