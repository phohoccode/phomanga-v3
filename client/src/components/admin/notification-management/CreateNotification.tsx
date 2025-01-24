"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setShowModalActionsNotification } from "@/store/slices/systemSlice";
import { setAction, setTitle } from "@/store/slices/notificationSlice";

const CreateNotification = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleCreate = () => {
    dispatch(setShowModalActionsNotification(true));
    dispatch(setAction("create"));
    dispatch(setTitle("Tạo thông báo mới"));
  };

  return (
    <Button
      onClick={handleCreate}
      size="large"
      color="cyan"
      variant="solid"
      icon={<PlusOutlined />}
    >
      Tạo thông báo
    </Button>
  );
};

export default CreateNotification;
