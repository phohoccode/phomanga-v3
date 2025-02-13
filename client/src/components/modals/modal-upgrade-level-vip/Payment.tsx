"use client";

import DescriptionTitle from "@/components/common/DescriptionTitle";
import { getColorVipLevel, scrollToCurrentElement } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button, Descriptions, DescriptionsProps, Skeleton, Tag } from "antd";
import { BankOutlined, ThunderboltOutlined } from "@ant-design/icons";

interface PaymentProps {
  data: {
    id: string;
    level: number;
    max_stories: number;
    price: number;
  };
  loading: boolean;
}

const Payment = ({ data, loading }: PaymentProps) => {
  const currentScrollRef = useRef<HTMLDivElement | null>(null);
  const { data: session }: any = useSession();
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên độc giả",
      children: !loading ? (
        <p>{session?.user?.name}</p>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "2",
      label: "Cấp độ VIP",
      children: !loading ? (
        <Tag color={getColorVipLevel(data?.level)}>VIP {data?.level}</Tag>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "3",
      label: "Số truyện lưu trữ",
      children: !loading ? (
        <p>{data?.max_stories}</p>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "4",
      label: "Tổng số tiền",
      children: !loading ? (
        <p>{data?.price} VNĐ</p>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
  ];

  useEffect(() => {
    if (!loading) {
      scrollToCurrentElement(currentScrollRef);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-6" ref={currentScrollRef}>
      <Descriptions
        size="small"
        className="mt-6"
        column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        title={
          <DescriptionTitle
            title="Thông tin thanh toán"
            icon={<BankOutlined />}
          />
        }
        bordered
        items={items}
      />

      <Link href="#" className="ml-auto">
        <Button
          color="cyan"
          variant="solid"
          icon={<ThunderboltOutlined />}
          iconPosition="start"
        >
          Nâng cấp
        </Button>
      </Link>
    </div>
  );
};

export default Payment;
