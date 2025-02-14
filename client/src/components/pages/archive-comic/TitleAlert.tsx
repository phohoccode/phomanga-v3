"use client";

import { getColorVipLevel } from "@/lib/utils";
import { getAllVipLevel } from "@/store/asyncThunk/vipLevelAsyncThunk";
import { setShowModalUpgradeLevelVip } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { ThunderboltOutlined } from "@ant-design/icons";
import { Alert, Button, Skeleton } from "antd";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TitleAlert = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion }: any = useSession();
  const { vipLevels, loading } = useSelector(
    (state: RootState) => state.vipLevel
  );
  const currentLevel = sesstion?.user?.vip_level ?? 0;
  const maxStories = sesstion?.user?.max_stories ?? 0;
  const levelMax = vipLevels[vipLevels.length - 1]?.level;

  useEffect(() => {
    dispatch(getAllVipLevel());
  }, []);

  if (loading) {
    return (
      <Skeleton.Input
        style={{
          width: "320px",
        }}
      />
    );
  }

  if (levelMax === currentLevel) {
    return null;
  }

  return (
    <Alert
      type="info"
      showIcon={true}
      message={
        <div className="flex gap-2 items-center">
          <span>
            Hiện tại bạn chỉ có thể lưu trữ {maxStories} truyện. Nâng cấp VIP để
            lưu trữ nhiều hơn.
          </span>
          <Button
            size="small"
            icon={<ThunderboltOutlined />}
            iconPosition="end"
            type="primary"
            onClick={() => dispatch(setShowModalUpgradeLevelVip(true))}
          >
            Nâng cấp ngay
          </Button>
        </div>
      }
      style={{ margin: "32px 0" }}
      closeIcon
    />
  );
};

export default TitleAlert;
