"use client";

import DescriptionTitle from "@/components/common/DescriptionTitle";
import {
  copyToClipboard,
  getColorVipLevel,
  scrollToCurrentElement,
} from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  message,
  Skeleton,
  Tag,
} from "antd";
import { BankOutlined, CopyOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const handleCopy = (text: string, _message: string) => {
  copyToClipboard(text);
  message.success(_message);
};

const PaymentInfomation = () => {
  const currentScrollRef = useRef<HTMLDivElement | null>(null);
  const { data: session }: any = useSession();
  const { width } = useSelector((state: RootState) => state.system);
  const { selectedCard, loading } = useSelector(
    (state: RootState) => state.vipLevel
  );

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
        <Tag color={getColorVipLevel(selectedCard?.level)}>
          VIP {selectedCard?.level}
        </Tag>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "3",
      label: "Số truyện lưu trữ",
      children: !loading ? (
        <p>{selectedCard?.max_stories}</p>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "4",
      label: "Tổng số tiền",
      children: !loading ? (
        <p>{selectedCard?.price} VNĐ</p>
      ) : (
        <Skeleton.Input style={{ width: 100, height: 24 }} />
      ),
    },
    {
      key: "5",
      label: "Ngân hàng",
      children: "VietinkBank",
    },
    {
      key: "6",
      label: "Số tài khoản",
      children: (
        <div className="flex gap-2 justify-between items-center">
          <p>107873364069</p>
          <Button
            className="flex-shrink-0"
            onClick={() =>
              handleCopy("107873364069", "Đã sao chép số tài khoản")
            }
            icon={<CopyOutlined />}
          />
        </div>
      ),
    },
    {
      key: "7",
      label: "Nội dung chuyển khoản",
      children: (
        <div className="flex gap-2 justify-between items-center">
          <p>{selectedCard?.id}</p>
          <Button
            className="flex-shrink-0"
            onClick={() =>
              handleCopy(selectedCard?.id, "Đã sao chép nội dung chuyển khoản")
            }
            icon={<CopyOutlined />}
          />
        </div>
      ),
    },
    {
      key: "8",
      label: "Lưu ý quan trọng!!!",
      children: (
        <p className="text-red-500 font-semibold">
          Vui lòng kiểm tra lại thông tin chuyển khoản! Đảm bảo rằng tất cả các
          thông tin đã nhập đúng. Mọi sai sót có thể dẫn đến việc giao dịch
          không thành công.
        </p>
      ),
    },
  ];

  useEffect(() => {
    if (!loading) {
      scrollToCurrentElement(currentScrollRef);
    }
  }, [selectedCard]);

  return (
    <div ref={currentScrollRef}>
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
        layout={width < 1024 ? "vertical" : "horizontal"}
      />
    </div>
  );
};

export default PaymentInfomation;
