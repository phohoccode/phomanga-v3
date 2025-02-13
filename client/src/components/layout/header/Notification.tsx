"use client";

import { setShowModalNotification } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

const Notification = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Button
      style={{ backgroundColor: "transparent" }}
      onClick={() => dispatch(setShowModalNotification(true))}
      icon={<BellOutlined />}
    />
  );
};

export default Notification;
