"use client";

import { formatDate } from "@/lib/utils";
import { Button, Space, Table } from "antd";
import Actions from "../Actions";

const TableNotification = ({ data }: { data: any }) => {
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
      render: () => {
        return <Actions handleDelete={handleDelete} handleEdit={handleEdit} />;
      },
    },
  ];

  const handleEdit = (id: number) => {};

  const handleDelete = (id: number) => {};

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
