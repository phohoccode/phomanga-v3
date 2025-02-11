"use client";

import { formatDate } from "@/lib/utils";
import { Table } from "antd";

const TableFeedback = ({ data }: { data: any }) => {
  const dataSource = data?.map((feedback: any) => {
    return {
      key: feedback.id,
      id: feedback.id,
      name: feedback.name,
      title: feedback.title,
      description: feedback.description,
      createdAt: formatDate(feedback.created_at),
    };
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <Table
      scroll={{ x: 500 }}
      bordered
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default TableFeedback;
