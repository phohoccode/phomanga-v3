"use client";

import { Col, Row } from "antd";
import { useParams } from "next/navigation";
import ChapterItem from "./ChapterItem";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const ChapterList = ({ chapters }: any) => {
  const params = useParams();
  const [viewedChapters, setViewedChapters] = useState<Record<string, any>>({});
  const viewedChapterBySlug = viewedChapters[params.slug as string] ?? [];
  const { getLocalStorage } = useLocalStorage();

  useEffect(() => {
    setViewedChapters(getLocalStorage("viewedChapters", {}));
  }, []);

  return (
    <Row gutter={[8, 8]}>
      {chapters?.map((item: any, index: number) => (
        <Col key={index} xs={8} sm={6} md={4} lg={3} xxl={2}>
          <ChapterItem
            data={item}
            slug={params?.slug as string}
            viewedChapterBySlug={viewedChapterBySlug}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ChapterList;
