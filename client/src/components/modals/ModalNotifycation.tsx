import RootModal from "./RootModal";

const ModalNotifycation = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <RootModal
      title="Thông báo"
      isModalOpen={isModalOpen}
      onCancel={onCancel}
      closeIcon={null}
    >
      <div>Thông báo</div>
    </RootModal>
  );
};

export default ModalNotifycation;
