"use client";

import { Col, Divider, Empty, Input, Pagination, Row } from "antd";
import Link from "next/link";
import { useState } from "react";

const quantity = 24;

const SessionChapter = ({ data }: any) => {
  const chaptersData = data?.chapters?.[0]?.server_data;
  const [chapters, setChapters] = useState(chaptersData?.slice(0, quantity));
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    setChapters(
      chaptersData.slice(page * quantity - quantity, page * quantity)
    );
  };

  const handleSearchChapter = (value: string) => {
    if (value === "") {
      setChapters(chaptersData.slice(0, quantity));
    } else {
      const searchChapter = chaptersData.filter((item: any) =>
        item?.chapter_name.toLowerCase().includes(value.toLowerCase())
      );
      setChapters(searchChapter);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <Divider orientation="center">Danh sách chương</Divider>
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
            <Row gutter={[8, 8]}>
              {chapters?.map((item: any, index: number) => (
                <Col key={index} xs={8} sm={6} md={4} lg={3} xxl={2}>
                  <Link
                    className="block w-full rounded-md hover:bg-gray-100 p-2 hover:text-[#13c2c2]"
                    href={`/dang-xem/${data?.slug}/${item?.chapter_api_data
                      ?.split("/")
                      .pop()}`}
                  >
                    Chương {item?.chapter_name}
                  </Link>
                </Col>
              ))}
            </Row>
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
