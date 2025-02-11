"use client";

import { setShowModalUserFeedback } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { ExceptionOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useDispatch } from "react-redux";

const UserFeedback = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Tooltip title="Báo lỗi truyện">
      <Button
        onClick={() => dispatch(setShowModalUserFeedback(true))}
        icon={<ExceptionOutlined />}
        variant="filled"
        color="gold"
      />
    </Tooltip>
  );
};

export default UserFeedback;
