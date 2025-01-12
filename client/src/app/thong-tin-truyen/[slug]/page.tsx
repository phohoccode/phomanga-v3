"use client";

import ComicSuggesion from "@/components/ComicSuggesion";
import SessionChapter from "@/components/info-page/SessionChapter";
import { SessionInfo } from "@/components/info-page/SessionInfo";
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
  const menuItems = [
    ...breadCrumb?.slice(0, -1).map((item: any, index: number) => {
      return {
        key: ++index,
        label: <Link href={`/chi-tiet${item?.slug}`}>{item?.name}</Link>,
      };
    }),
  ];
  const breadcrumbItems = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Thông tin truyện" },
    { title: "Thể loại", menu: { items: menuItems } },
    { title: breadCrumb?.[breadCrumb.length - 1]?.name ?? "Không xác định" },
  ];

  useEffect(() => {
    dispatch(fetchComicInfo({ slug: params?.slug as string }));
  }, [params?.slug]);

  if (loading) {
    return <SkeletonInfoPage />;
  }

  return (
    <div className="p-6">
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
    </div>
  );
};

export default Page;
