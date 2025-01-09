import RootModal from "./RootModal";

const ModalSearch = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <RootModal
      title="Tìm kiếm truyện tranh"
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      <p>Tìm kiếm truyện tranh</p>
    </RootModal>
  );
};

export default ModalSearch;
