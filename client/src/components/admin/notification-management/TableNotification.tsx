"use client";

import { formatDate } from "@/lib/utils";
import { message, Table } from "antd";
import Actions from "../Actions";
import { useSession } from "next-auth/react";
import { deleteNotification } from "@/lib/actions";
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

const TableNotification = ({ data }: { data: any }) => {
  const { data: sesstion } = useSession();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const dataSource = data?.map((comment: any) => {
    return {
      key: comment.id,
      id: comment.id,
      title: comment.title,
      content: comment.content,
      createdAt: formatDate(comment.created_at),
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
          <Actions
            loading={loadingId === record.id}
            handleDelete={() => handleDelete(record.id)}
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
    const response = await deleteNotification(id, sesstion?.user?.id as string);
    setLoadingId("");

    if (response?.status === "success") {
      message.success(response?.message);
      router.refresh();
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
