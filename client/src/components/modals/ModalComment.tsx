"use client";

import CommentBox from "../comment/CommentBox";
import RootModal from "./RootModal";
import { MessageOutlined } from "@ant-design/icons";

const ModalComment = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <RootModal
      footer={null}
      title={
        <div className="flex items-center gap-2">
          <MessageOutlined />
          Bình luận
        </div>
      }
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      <div className="mt-8">
        <CommentBox isScroll={true} />
      </div>
    </RootModal>
  );
};

export default ModalComment;
