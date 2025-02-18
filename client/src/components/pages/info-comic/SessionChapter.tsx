"use client";

import { useState } from "react";
import { CoffeeOutlined } from "@ant-design/icons";
import { Divider, Empty, Input, Pagination } from "antd";
import { useParams } from "next/navigation";
import ChapterList from "./ChapterList";

const quantity = 24;

const SessionChapter = ({ data }: any) => {
  const chaptersData = data?.chapters?.[0]?.server_data;
  const [chapters, setChapters] = useState(chaptersData?.slice(0, quantity));
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    setChapters(
      chaptersData.slice(page * quantity - quantity, page * quantity)
    );
  };

  const handleSearchChapter = (value: string) => {
    if (value?.trim() === "") {
      setChapters(chaptersData?.slice(0, quantity));
    } else {
      const searchChapter = chaptersData?.filter((item: any) =>
        item?.chapter_name.toLowerCase().includes(value.toLowerCase())
      );
      setChapters(searchChapter);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <Divider orientation="center">
        <CoffeeOutlined className="mr-2" />
        Danh sách chương
      </Divider>
      {chaptersData?.length > 0 ? (
        <>
          <Input
            onChange={(e) => handleSearchChapter(e.target.value)}
            allowClear
            placeholder="Tìm kiếm chương ..."
          />
          {chapters?.length === 0 ? (
            <Empty description="Không có dữ liệu" />
          ) : (
            <ChapterList chapters={chapters} slug={params?.slug as string} />
          )}

          {chaptersData?.length > quantity && chapters?.length > 0 && (
            <Pagination
              style={{ marginTop: "16px" }}
              onChange={(page) => handlePagination(page)}
              align="center"
              current={currentPage}
              showSizeChanger={false}
              total={data?.chapters?.[0]?.server_data.length}
              pageSize={quantity}
            />
          )}
        </>
      ) : (
        <Empty description="Không có dữ liệu" />
      )}
    </div>
  );
};

export default SessionChapter;
