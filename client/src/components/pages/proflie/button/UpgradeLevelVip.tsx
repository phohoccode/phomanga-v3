"use client";

import { setShowModalUpgradeLevelVip } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { ThunderboltOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const UpgradeLevelVip = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session }: any = useSession();
  const params = useParams();


  if (!session || session?.user?.id !== params?.id) return null;

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
