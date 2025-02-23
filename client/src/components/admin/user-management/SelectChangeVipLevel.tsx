"use client";

import { createNotification, updateVipLevels } from "@/lib/actions/admin";
import { socket } from "@/lib/socket";
import { message, Modal, Select } from "antd";
import { useState } from "react";

const { confirm } = Modal;

interface SelectChangeVipLevelProps {
  defaultValue: string;
  userId: string;
  options: any[];
}

const SelectChangeVipLevel = ({
  defaultValue,
  userId,
  options,
}: SelectChangeVipLevelProps) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (value: string) => {
    confirm({
      title: "Thay đổi cấp độ VIP?",
      content: "Bạn có chắc chắn muốn thay đổi cấp độ VIP của người dùng này?",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleOk(value);
      },
      onCancel() {
        setValue(defaultValue);
      },
    });
  };

  const handleOk = async (id: string) => {
    const response: any = await updateVipLevels(userId, id);

    if (response?.status === "success") {
      setValue(id);
      message.success(response?.message);

      socket.emit("update-vip-level", {
        userId,
      });

      await createNotification(
        "update-vip-level",
        "Cấp độ VIP của bạn vừa được cập nhật.",
        userId,
        "user"
      );
    } else {
      message.error(response?.message || "Có lỗi xảy ra!");
    }
  };

  return (
    <Select
      style={{ width: 90 }}
      value={value}
      variant="outlined"
      onChange={handleChange}
      options={options}
    />
  );
};

export default SelectChangeVipLevel;
