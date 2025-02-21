"use client";

import EmptyData from "@/components/common/EmptyData";
import SkeletonCardListLevelVip from "@/components/skeleton/SkeletonCardListLevelVip";
import { getColorVipLevel } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { CheckOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setSelectedCard, VipLevel } from "@/store/slices/vipLevelSlice";

const CardListLevelVip = () => {
  const { data: session }: any = useSession();
  const { selectedCard, loading, vipLevels } = useSelector(
    (state: RootState) => state.vipLevel
  );
  const dispatch: AppDispatch = useDispatch();

  const handleChangeSelectedCard = (vipLevel: VipLevel) => {
    dispatch(
      setSelectedCard({
        id: vipLevel.id,
        level: vipLevel.level,
        price: vipLevel.price,
        max_stories: vipLevel.max_stories,
        nickname: vipLevel.nickname,
      })
    );
  };

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
              onClick={() => handleChangeSelectedCard(vipLevel)}
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
                selectedCard.id === vipLevel.id ? "border-[#13c2c2] border" : ""
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
                <span className="text-gray-600">{vipLevel?.price} VNĐ</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-semibold ">Biệt danh</span>
                <span className="text-gray-600">{vipLevel?.nickname}</span>
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
