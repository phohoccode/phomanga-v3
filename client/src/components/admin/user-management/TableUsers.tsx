"use client";

import { formatDate } from "@/lib/utils";
import { Table } from "antd";

const TableUsers = ({ data }: { data: any }) => {
  console.log(data);

  const dataSource = data?.map((user: any) => {
    return {
      key: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      typeAccount: user.type_account,
      status: user.account_status,
      createdAt: formatDate(user.created_at),
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Loại tài khoản",
      dataIndex: "typeAccount",
      key: "typeAccount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return <Table bordered dataSource={dataSource} columns={columns} />;
};

export default TableUsers;
