"use client";

import RootModal from "../RootModal";
import CardListLevelVip from "./CardListLevelVip";
import { useEffect, useState } from "react";
import Payment from "./PaymentInfomation";
import { useSession } from "next-auth/react";
import { Col, Row } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";

export interface VipLevel {
  index: number;
  id: "";
  price: number;
  level: number;
  max_stories: number;
}

const ModalUpgradeLevelVip = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const [vipLevels, setVipLevels] = useState<VipLevel[]>([]);
  const [seledtedCard, setSelectedCard] = useState<VipLevel>({
    index: 0,
    id: "",
    level: 0,
    price: 0,
    max_stories: 0,
  });
  const [loading, setLoading] = useState(true);
  const { data: session, update }: any = useSession();

  useEffect(() => {
    const index = session?.user?.vip_level - 1;

    setSelectedCard({
      index,
      id: vipLevels[index]?.id,
      level: vipLevels[index]?.level,
      price: vipLevels[index]?.price,
      max_stories: vipLevels[index]?.max_stories,
    });
  }, [session]);

  return (
    <RootModal
      title={
        <div className="flex gap-2">
          <ThunderboltOutlined />
          Nâng cấp VIP
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
          <CardListLevelVip
            loading={loading}
            selectedCard={seledtedCard}
            vipLevels={vipLevels}
            setLoading={setLoading}
            setVipLevels={setVipLevels}
            setSelectedCard={setSelectedCard}
          />
        </Col>
        <Col xs={24} lg={8}>
          <Payment data={seledtedCard} loading={loading} />
        </Col>
      </Row>
    </RootModal>
  );
};

export default ModalUpgradeLevelVip;
