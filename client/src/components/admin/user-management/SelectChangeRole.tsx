"use client";

import { createNotification, updateUserRole } from "@/lib/actions";
import { socket } from "@/lib/socket";
import { message, Modal, Select } from "antd";
import { useState } from "react";

const { confirm } = Modal;

interface SelectChangeRoleProps {
  defaultValue: "user" | "admin";
  userId: string;
}

const SelectChangeRole = ({ defaultValue, userId }: SelectChangeRoleProps) => {
  const [value, setValue] = useState<"admin" | "user">(defaultValue);

  const handleChange = (value: "admin" | "user") => {
    confirm({
      title: "Thay đổi vai trò?",
      content: "Bạn có chắc chắn muốn thay đổi vai trò của người dùng này?",
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

  const handleOk = async (role: "admin" | "user") => {
    const response: any = await updateUserRole(userId, role);

    if (response?.status === "success") {
      setValue(role);
      message.success(response?.message ?? "Thay đổi vai trò thành công!");

      socket.emit("update-role", { userId, role });

      const nickname = role === "admin" ? "Admin" : "User";

      await createNotification(
        "Cập nhật vai trò",
        `Vai trò của bạn vừa được cập nhật thành ${nickname}.`,
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
      options={[
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ]}
    />
  );
};

export default SelectChangeRole;
