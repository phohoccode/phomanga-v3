"use client";

import { message, Table } from "antd";
import { formatDate } from "@/lib/utils";
import Actions from "./ActionsNotification";
import { useSession } from "next-auth/react";
import { deleteNotification } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setShowModalActionsNotification } from "@/store/slices/systemSlice";
import {
  setAction,
  setDataUpdate,
  setTitle,
} from "@/store/slices/notificationSlice";
import { socket } from "@/lib/socket";
import ActionsNotification from "./ActionsNotification";

const TableNotification = ({ data }: { data: any }) => {
  const { data: sesstion }: any = useSession();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const dataSource = data?.map((notification?: any) => {
    return {
      key: notification?.id,
      id: notification?.id,
      title: notification?.title,
      content: notification?.content,
      createdAt: formatDate(notification?.created_at),
    };
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <ActionsNotification
            loading={loadingId === record?.id}
            handleDelete={() => handleDelete(record?.id)}
            handleEdit={() => handleEdit(record)}
          />
        );
      },
    },
  ];

  const handleEdit = (record: any) => {
    dispatch(setShowModalActionsNotification(true));
    dispatch(setDataUpdate(record));
    dispatch(setAction("update"));
    dispatch(setTitle("Cập nhật thông báo"));
  };

  const handleDelete = async (id: string) => {
    if (!sesstion) {
      message.error("Vui lòng đăng nhập để thực hiện chức năng này.");
      return;
    }

    setLoadingId(id);
    const response = await deleteNotification({
      notificationId: id,
      userId: sesstion?.user?.id as string,
      role: sesstion?.user?.role as "admin" | "user",
    });
    setLoadingId("");

    if (response?.status === "success") {
      message.success(response?.message);
      router.refresh();

      socket.emit("delete-notification");
    } else {
      message.error(response?.message);
    }
  };

  return (
    <Table
      scroll={{ x: 500 }}
      bordered
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default TableNotification;
