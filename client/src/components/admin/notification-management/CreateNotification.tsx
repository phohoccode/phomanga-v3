"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ModalActionsNotification from "./ModalActionsNotification";
import { useState } from "react";

const CreateNotification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        size="large"
        color="cyan"
        variant="solid"
        icon={<PlusOutlined />}
      >
        Tạo thông báo
      </Button>

      <ModalActionsNotification
        loading={loading}
        action="create"
        title="Tạo thông báo mới"
        onCancel={handleCancel}
        onOk={handleOk}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default CreateNotification;
