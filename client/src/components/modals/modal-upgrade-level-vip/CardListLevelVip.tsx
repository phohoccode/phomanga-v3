"use client";

import EmptyData from "@/components/common/EmptyData";
import SkeletonCardListLevelVip from "@/components/skeleton/SkeletonCardListLevelVip";
import { getAllVipLevel } from "@/lib/actions";
import { Card, Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";

const CardListLevelVip = ({
  selectedCard,
  setSelectedCard,
}: {
  selectedCard: number;
  setSelectedCard: (index: number) => void;
}) => {
  const [vipLevels, setVipLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = ["cyan", "green", "gold", "purple", "red"];

  useEffect(() => {
    const fetchVipLevels = async () => {
      setLoading(true);
      const response = await getAllVipLevel();
      setLoading(false);
      setVipLevels(response?.data?.items ?? []);
    };

    fetchVipLevels();
  }, []);

  if (loading) return <SkeletonCardListLevelVip />;

  if (vipLevels?.length === 0 && !loading) {
    return <EmptyData description="Không có dữ liệu" />;
  }

  return (
    <div className="mt-6">
      <Row gutter={[16, 16]}>
        {vipLevels?.map((vipLevel: any, index: number) => (
          <Col key={index} xs={24} md={12}>
            <Card
              onClick={() => setSelectedCard(index)}
              loading={loading}
              title={
                <div className="flex justify-between items-center">
                  <Tag color={colors[index]}>Vip {vipLevel?.level}</Tag>
                  <span className="text-sm text-gray-600">{vipLevel?.id}</span>
                </div>
              }
              className={`text-center cursor-pointer ${
                selectedCard === index ? "border-[#13c2c2] border" : ""
              }`}
            >
              <div className="flex justify-between gap-2">
                <span className="font-semibold ">Truyện lưu trữ</span>
                <span className="text-gray-600">
                  {vipLevel?.max_stories} truyện
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-semibold ">Tiền nâng cấp</span>
                <span className="text-gray-600">{vipLevel?.price}đ</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardListLevelVip;
