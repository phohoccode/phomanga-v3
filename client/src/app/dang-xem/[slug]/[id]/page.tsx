"use client";

import EmptyData from "@/components/common/EmptyData";
import Layout from "@/components/layout/Layout";
import SessionImage from "@/components/read-page/SessionImages";
import SesstionControls from "@/components/read-page/SesstionControls";
import SkeletonReadPage from "@/components/skeleton/SkeletonReadPage";
import { fetchComicInfo, fetchImageComic } from "@/store/asyncThunk/comic";
import { AppDispatch, RootState } from "@/store/store";
import { ToTopOutlined } from "@ant-design/icons";
import { Breadcrumb, FloatButton, Tooltip } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { item, loading } = useSelector(
    (state: RootState) => state.comic.imagesComic
  );
  const { items } = useSelector((state: RootState) => state.comic.comicInfo);
  const width = useSelector((state: RootState) => state.system.width);
  const breadCrumb = [
    { title: "Trang chủ", href: "/" },
    { title: "Đang xem" },
    { title: `${items?.name}` },
    { title: `Chương ${item?.chapter_name}` },
  ];

  useEffect(() => {
    dispatch(fetchComicInfo({ slug: params?.slug as string }));
  }, [params?.slug]);

  useEffect(() => {
    dispatch(fetchImageComic({ id: params?.id as string }));
  }, [params?.id]);

  if (loading) {
    return <SkeletonReadPage width={width} />;
  }

  if (!item || !items) {
    return <EmptyData description="Không có dữ liệu" />;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <Breadcrumb items={breadCrumb} />

        <SesstionControls
          location="top"
          dataInfoComic={items}
          dataChapterComic={item}
        />

        <SessionImage item={item} />

        {!loading && (
          <SesstionControls
            location="bottom"
            dataInfoComic={items}
            dataChapterComic={item}
          />
        )}

        <Tooltip title="Lên đầu trang">
          <FloatButton.BackTop
            shape="circle"
            type="primary"
            style={{
              insetInlineEnd: "32px",
              insetBlockEnd: width > 768 ? "32px" : "96px",
            }}
            icon={<ToTopOutlined />}
          />
        </Tooltip>
      </div>
    </Layout>
  );
};

export default Page;
