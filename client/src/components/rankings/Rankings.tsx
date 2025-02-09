"use client";

import { criterion } from "@/lib/types";
import { Divider, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import ListUser from "./ListUser";
import { getUserRankings } from "@/lib/actions";
import SkeletonRankings from "../skeleton/SkeletonRankings";
import EmptyData from "../common/EmptyData";

const Rankings = () => {
  const [criterion, setCriterion] = useState<criterion>("vip_level");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getUserRankings(criterion);
      setLoading(false);

      if (response.status === "success") {
        setData(response.data);
      }
    };

    fetchData();
  }, [criterion]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Cấp độ Vip",
      children: <ListUser data={data} />,
    },
    {
      key: "2",
      label: "Truyện đã lưu",
      children: <ListUser data={data} />,
    },
    {
      key: "3",
      label: "Số truyện đã đọc",
      children: <ListUser data={data} />,
    },
    {
      key: "4",
      label: "Bình luận đã viết",
      children: <ListUser data={data} />,
    },
  ];

  const onChange = (key: string) => {
    if (key === "1") {
      setCriterion("vip_level");
    } else if (key === "2") {
      // setCriterion("saved_comic");
    } else if (key === "3") {
      // setCriterion("number_of_stories_read");
    } else if (key === "4") {
      setCriterion("comment_wrote");
    }

    setKey(key);
  };

  if (loading) return <SkeletonRankings />;

  if (!data) return <EmptyData description="Không có dữ liệu" />;

  return (
    <div className="my-8">
      <Divider orientation="center" style={{ marginBottom: "32px" }}>
        Bảng xếp hạng
      </Divider>
      <Tabs
        activeKey={key}
        tabPosition="left"
        centered
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default Rankings;
