"use client";

import { setSavingHistory } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonPauseSavingHistory = () => {
  const { savingHistory } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const isSave = localStorage.getItem("savingHistory") ?? false;
    dispatch(setSavingHistory(isSave));
  }, []);

  const handleSavingHistory = () => {
    message.info(
      savingHistory ? "Đã tạm dừng lưu lịch sử" : "Đã tiếp tục lưu lịch sử"
    );
    dispatch(setSavingHistory(!savingHistory));
  };

  return (
    <Button
      icon={savingHistory ? <PauseOutlined /> : <PlayCircleOutlined />}
      color="blue"
      variant="solid"
      onClick={handleSavingHistory}
    >
      {savingHistory ? "Tạm dừng lưu lịch sử" : "Tiếp tục lưu lịch sử"}
    </Button>
  );
};

export default ButtonPauseSavingHistory;
