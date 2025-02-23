"use client";

import { formatDate } from "@/lib/utils";
import { message, Table } from "antd";
import MarkUserCommentAsSpam from "./MarkUserCommentAsSpam";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

const TableComments = ({ data }: { data: any }) => {
  const router = useRouter();

  useEffect(() => {
    socket.on("refresh-table-comments", (res) => {
      message.info(res?.message);
      router.refresh();
    });

    return () => {
      socket.off("refresh-table-comments");
    };
  }, []);

  const dataSource = data?.map((comment: any) => {
    return {
      key: comment?.id,
      id: comment?.id,
      slug: comment?.comic_slug,
      username: comment?.name,
      comicName: comment?.comic_name,
      userId: comment?.user_id,
      content: comment?.content,
      isDeleted: comment?.is_deleted ? "Đã xóa" : "Chưa xóa",
      isSpam: comment?.is_spam,
      createdAt: formatDate(comment?.created_at),
    };
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người bình luận",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Tên truyện",
      dataIndex: "comicName",
      key: "comicName",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Tình trạng",
      dataIndex: "isDeleted",
      key: "isDeleted",
    },
    {
      title: "Spam",
      dataIndex: "isSpam",
      key: "isSpam",
      render: (_: any, record: any) => <MarkUserCommentAsSpam data={record} />,
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

export default TableComments;
