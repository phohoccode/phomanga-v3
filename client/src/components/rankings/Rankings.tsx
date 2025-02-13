"use client";

import { criterion, ListUserProps } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import ListUser from "./ListUser";
import { getUserRankings } from "@/lib/actions";
import SkeletonRankings from "../skeleton/SkeletonRankings";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Divider, Tabs, TabsProps } from "antd";
import { TrophyOutlined } from "@ant-design/icons";

const Rankings = () => {
  const [criterion, setCriterion] = useState<criterion>("vip_level");
  const width = useSelector((state: RootState) => state.system.width);
  const [data, setData] = useState<ListUserProps>({
    criterion: "vip_level",
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("1");
  const currentScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getUserRankings(criterion);
      setLoading(false);

      if (response?.status === "success") {
        setData(response.data ?? { criterion: "vip_level", users: [] });
      }
    };

    fetchData();
  }, [criterion]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Cấp độ Vip",
      children: <ListUser users={data.users} criterion={data.criterion} />,
    },
    {
      key: "2",
      label: "Truyện đã lưu",
      children: <ListUser users={data.users} criterion={data.criterion} />,
    },
    {
      key: "3",
      label: (
        <div className="flex items-center">
          <span>Số truyện đã xem</span>
        </div>
      ),
      children: <ListUser users={data.users} criterion={data.criterion} />,
    },
    {
      key: "4",
      label: "Bình luận đã viết",
      children: <ListUser users={data.users} criterion={data.criterion} />,
    },
  ];

  const onChange = (key: string) => {
    if (key === "1") {
      setCriterion("vip_level");
    } else if (key === "2") {
      setCriterion("saved_comic");
    } else if (key === "3") {
      setCriterion("number_of_stories_read");
    } else if (key === "4") {
      setCriterion("comment_wrote");
    }

    setKey(key);
  };

  if (loading) return <SkeletonRankings />;

  return (
    <div className="my-8" ref={currentScrollRef}>
      <Divider orientation="center" style={{ marginBottom: "32px" }}>
        <TrophyOutlined className="mr-1" />
        Bảng xếp hạng
      </Divider>
      <Tabs
        activeKey={key}
        tabPosition={width > 1024 ? "left" : "top"}
        centered
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default Rankings;
