"use client";

import { Col, Divider, Row } from "antd";
import RootModal from "../RootModal";
import CardListLevelVip from "./CardListLevelVip";
import { ThunderboltOutlined } from "@ant-design/icons";
import { useState } from "react";

const ModalUpgradeLevelVip = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const [seledtedCard, setSelectedCard] = useState(0);

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
        sm: "80%",
        md: "70%",
        lg: "70%",
        xl: "70%",
        xxl: "70%"
      }}
    >
      <Row gutter={[48, 48]}>
        <Col xs={24} lg={16}>
          <CardListLevelVip
            selectedCard={seledtedCard}
            setSelectedCard={setSelectedCard}
          />
        </Col>
        <Col xs={24} lg={8}>
          <Divider orientation="center">Thanh toán </Divider>
        </Col>
      </Row>
    </RootModal>
  );
};

export default ModalUpgradeLevelVip;
