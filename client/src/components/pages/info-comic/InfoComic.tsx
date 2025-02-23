"use client";

import ComicSuggesion from "@/components/comic/ComicSuggesion";
import CommentBox from "@/components/comment/CommentBox";
import EmptyData from "@/components/common/EmptyData";
import Layout from "@/components/layout/Layout";
import SessionChapter from "@/components/pages/info-comic/SessionChapter";
import { SessionInfo } from "@/components/pages/info-comic/SessionInfo";
import SkeletonInfoPage from "@/components/skeleton/SkeletonInfoPage";
import { randomItemFromArray } from "@/lib/utils";
import {
  fetchComicDetail,
  fetchComicInfo,
} from "@/store/asyncThunk/comicAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Col, Divider, Row } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import Donate from "@/components/common/Donate";

const InfoComic = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, breadCrumb, loading } = useSelector(
    (state: RootState) => state.comic.comicInfo,
    shallowEqual
  );
  const catetorys = useSelector(
    (state: RootState) => state.comic.catetorys.items
  );

  const breadcrumbItems = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Thông tin truyện" },
    { title: breadCrumb?.[breadCrumb.length - 1]?.name ?? "Không xác định" },
  ];

  useEffect(() => {
    dispatch(fetchComicInfo({ slug: params?.slug as string }));
  }, [params?.slug]);

  useEffect(() => {
    handleGenarateComicSuggestions();
  }, [catetorys]);

  const handleGenarateComicSuggestions = () => {
    if (catetorys?.length > 0) {
      const itemRandom = randomItemFromArray(catetorys);
      dispatch(
        fetchComicDetail({
          description: "the-loai",
          slug: itemRandom?.slug,
          currentPage: "1",
        })
      );
    }
  };

  if (loading) {
    return <SkeletonInfoPage />;
  }

  if (!items) {
    return <EmptyData description="Không tìm thấy thông tin truyện" />;
  }

  return (
    <Layout>
      <Breadcrumb items={breadcrumbItems} />

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col lg={24} xl={18} md={24} sm={24} xs={24}>
          <SessionInfo data={items} />
          <SessionChapter data={items} />

          <div className="mt-12">
            <Donate />
          </div>

          <div className="flex flex-col gap-2 mt-12">
            <Divider orientation="left">
              <CommentOutlined className="mr-2" />
              Bình luận
            </Divider>
            <CommentBox />
          </div>
        </Col>
        <Col lg={24} xl={6} md={24} sm={24} xs={24}>
          <ComicSuggesion title="Gợi ý cho bạn" />
        </Col>
      </Row>
    </Layout>
  );
};

export default InfoComic;
