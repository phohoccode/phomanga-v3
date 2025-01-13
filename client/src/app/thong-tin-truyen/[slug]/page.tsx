"use client";

import ComicSuggesion from "@/components/ComicSuggesion";
import SessionChapter from "@/components/info-page/SessionChapter";
import { SessionInfo } from "@/components/info-page/SessionInfo";
import Layout from "@/components/layout/Layout";
import SkeletonInfoPage from "@/components/skeleton/SkeletonInfoPage";
import { fetchComicInfo } from "@/store/asyncThunk/comic";
import { AppDispatch, RootState } from "@/store/store";
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Page = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, breadCrumb, loading } = useSelector(
    (state: RootState) => state.comic.comicInfo,
    shallowEqual
  );

  const breadcrumbItems = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Thông tin truyện" },
    { title: breadCrumb?.[breadCrumb.length - 1]?.name ?? "Không xác định" },
  ];

  useEffect(() => {
    dispatch(fetchComicInfo({ slug: params?.slug as string }));
  }, [params?.slug]);

  if (loading) {
    return <SkeletonInfoPage />;
  }

  return (
    <Layout>
      
      <Breadcrumb items={breadcrumbItems} />

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col lg={24} xl={18} md={24} sm={24} xs={24}>
          <SessionInfo data={items} />
          <SessionChapter data={items} />
        </Col>
        <Col lg={24} xl={6} md={24} sm={24} xs={24}>
          <ComicSuggesion />
        </Col>
      </Row>
    </Layout>
  );
};

export default Page;
