"use client";

import RootModal from "../RootModal";
import CardListLevelVip from "./CardListLevelVip";
import { useEffect } from "react";
import PaymentInfomation from "./PaymentInfomation";
import { useSession } from "next-auth/react";
import { Col, Row } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllVipLevel } from "@/store/asyncThunk/vipLevelAsyncThunk";
import { setSelectedCard } from "@/store/slices/vipLevelSlice";

export interface VipLevel {
  index: number;
  id: string;
  price: number;
  level: number;
  max_stories: number;
  nickname: string;
}

const ModalUpgradeLevelVip = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const { data: session }: any = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { vipLevels } = useSelector((state: RootState) => state.vipLevel);

  useEffect(() => {
    const index = session?.user?.vip_level;

    dispatch(
      setSelectedCard({
        index,
        id: vipLevels[index]?.id,
        level: vipLevels[index]?.level,
        price: vipLevels[index]?.price,
        max_stories: vipLevels[index]?.max_stories,
        nickname: vipLevels[index]?.nickname,
      })
    );
  }, [session]);

  useEffect(() => {
    dispatch(getAllVipLevel());
  }, []);

  return (
    <RootModal
      title={
        <div className="flex gap-2">
          <ThunderboltOutlined />
          Các gói nâng cấp
        </div>
      }
      isModalOpen={isModalOpen}
      footer={null}
      onCancel={onCancel}
      width={{
        xs: "90%",
        sm: "90%",
        md: "90%",
        lg: "90%",
        xl: "90%",
        xxl: "80%",
      }}
    >
      <Row gutter={[48, 48]}>
        <Col xs={24} lg={16}>
          <CardListLevelVip />
        </Col>
        <Col xs={24} lg={8}>
          <PaymentInfomation />
        </Col>
      </Row>
    </RootModal>
  );
};

export default ModalUpgradeLevelVip;
