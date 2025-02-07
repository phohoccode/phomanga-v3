"use client";

import { setShowModalUpgradeLevelVip } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { ThunderboltOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const UpgradeLevelVip = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Button
      size="small"
      icon={<ThunderboltOutlined />}
      iconPosition="end"
      onClick={() => dispatch(setShowModalUpgradeLevelVip(true))}
      variant="solid"
      color="cyan"
    >
      Nâng cấp
    </Button>
  );
};

export default UpgradeLevelVip;
