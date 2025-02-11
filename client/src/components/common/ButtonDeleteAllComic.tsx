"use client";

import { deleteAllComic } from "@/lib/actions";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";

const { confirm } = Modal;

const ButtonDeleteAllComic = ({ type }: { type: string }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteAllComic = async () => {
    setLoading(true);
    const res: any = await deleteAllComic(session?.user?.id as string, type);
    setLoading(false);

    if (res?.status === "success") {
      message.success(
        type === "SAVED_COMIC"
          ? "Tất cả truyện trong kho lưu trữ đã bay màu!"
          : "Lịch sử đã xem đã được dọn dẹp!"
      );
    }
  };

  const showConfirm = () => {
    confirm({
      title: "Xoá hết thật luôn hả?",
      content: "Xoá là hết sạch luôn đó nha! Không quay xe được đâu!",
      icon: <ExclamationCircleFilled />,
      okText: "Xoá hết đi",
      okType: "danger",
      cancelText: "Hủy vội",
      onOk() {
        handleDeleteAllComic();
      },
      onCancel() {},
    });
  };

  return (
    <Button
      icon={<DeleteOutlined />}
      loading={loading}
      onClick={showConfirm}
      type="primary"
      danger
    >
      Xoá tất cả
    </Button>
  );
};

export default ButtonDeleteAllComic;
