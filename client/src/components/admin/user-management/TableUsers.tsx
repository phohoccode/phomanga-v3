"use client";

import { formatDate } from "@/lib/utils";
import { Table } from "antd";
import SelectChangeRole from "./SelectChangeRole";
import SelectChangeVipLevel from "./SelectChangeVipLevel";
import { useEffect, useState } from "react";
import { getAllVipLevel } from "@/lib/actions";

interface TableUsersProps {
  data: {
    id: string;
    name: string;
    email: string;
    type_account: string;
    role: string;
    vip_level: string;
    created_at: string;
  }[];
}

const TableUsers = ({ data }: TableUsersProps) => {
  const [vipLevels, setVipLevels] = useState<any[]>([]);

  const dataSource = data?.map((user) => {
    return {
      key: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      typeAccount: user.type_account,
      roleName: user.role,
      vipLevel: user.vip_level,
      createdAt: formatDate(user.created_at),
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await getAllVipLevel();

      if (response?.status === "success") {
        const data = response?.data?.items?.map((item: any) => {
          return {
            value: item?.id ?? "",
            label: `Cấp ${item?.level ?? 1}`,
          };
        });

        setVipLevels(data);
      }
    };

    fetchData();
  }, []);

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
      title: "Vai trò",
      dataIndex: "roleName",
      key: "roleName",
      render: (_: any, record: any) => (
        <SelectChangeRole defaultValue={record.roleName} userId={record.id} />
      ),
    },
    {
      title: "Cấp độ VIP",
      dataIndex: "vipLevel",
      key: "vipLevel",
      render: (_: any, record: any) => (
        <SelectChangeVipLevel
          defaultValue={`Cấp ${record.vipLevel}`}
          userId={record.id}
          options={vipLevels}
        />
      ),
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

export default TableUsers;
