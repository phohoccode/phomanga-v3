"use client";

import { formatDate } from "@/lib/utils";
import { Table } from "antd";

const TableComments = ({ data }: { data: any }) => {
  const dataSource = data?.map((comment: any) => {
    return {
      key: comment.id,
      id: comment.id,
      slug: comment.comic_slug,
      name: comment.name,
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
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
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
  ];

  return <Table bordered dataSource={dataSource} columns={columns} />;
};

export default TableComments;
