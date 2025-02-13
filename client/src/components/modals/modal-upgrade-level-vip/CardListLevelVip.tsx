"use client";

import EmptyData from "@/components/common/EmptyData";
import SkeletonCardListLevelVip from "@/components/skeleton/SkeletonCardListLevelVip";
import { getAllVipLevel } from "@/lib/actions";
import { getColorVipLevel } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tag } from "antd";

interface VipLevel {
  index: number;
  id: string;
  price: number;
  level: number;
  max_stories: number;
}

interface CardListLevelVipProps {
  loading: boolean;
  selectedCard: VipLevel;
  vipLevels: VipLevel[];
  setVipLevels: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setSelectedCard: (data: any) => void;
}

const CardListLevelVip = ({
  loading,
  selectedCard,
  vipLevels,
  setVipLevels,
  setLoading,
  setSelectedCard,
}: CardListLevelVipProps) => {
  const { data: session }: any = useSession();

  useEffect(() => {
    const fetchVipLevels = async () => {
      setLoading(true);
      const response = await getAllVipLevel();
      setLoading(false);

      if (response?.status === "success") {
        setVipLevels(response?.data?.items ?? []);
      }
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
        {vipLevels?.map((vipLevel: VipLevel, index: number) => (
          <Col key={index} xs={24} md={12}>
            <Card
              onClick={() =>
                setSelectedCard({
                  index,
                  id: vipLevel?.id,
                  level: vipLevel?.level,
                  price: vipLevel?.price,
                  max_stories: vipLevel?.max_stories,
                })
              }
              loading={loading}
              title={
                <div className="flex justify-between items-center">
                  <Tag color={getColorVipLevel(vipLevel?.level)}>
                    Vip {vipLevel?.level}
                  </Tag>
                  <span className="text-sm text-gray-600">{vipLevel?.id}</span>
                </div>
              }
              className={`text-center cursor-pointer ${
                vipLevel.level <= session?.user?.vip_level
                  ? "pointer-events-none opacity-60"
                  : "pointer-events-auto"
              } ${
                selectedCard.index === index ? "border-[#13c2c2] border" : ""
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
              {vipLevel.level <= session?.user?.vip_level && (
                <p className="text-sm text-[#13c2c2] mt-2 text-right">
                  <CheckOutlined className="mr-1" />
                  Đã nâng cấp
                </p>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardListLevelVip;
