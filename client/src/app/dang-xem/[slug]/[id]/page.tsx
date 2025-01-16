"use client";

import EmptyData from "@/components/ui/EmptyData";
import Layout from "@/components/layout/Layout";
import SessionImage from "@/components/read-page/SessionImages";
import SesstionControls from "@/components/read-page/SesstionControls";
import SkeletonReadPage from "@/components/skeleton/SkeletonReadPage";
import {
  fetchComicInfo,
  fetchImageComic,
} from "@/store/asyncThunk/comicAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { ToTopOutlined } from "@ant-design/icons";
import { Breadcrumb, FloatButton, Tooltip } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveComic } from "@/store/asyncThunk/userAsyncThunk";
import { useSession } from "next-auth/react";

const Page = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { item, loading } = useSelector(
    (state: RootState) => state.comic.imagesComic
  );
  const { data: session } = useSession();
  const { items } = useSelector((state: RootState) => state.comic.comicInfo);
  const width = useSelector((state: RootState) => state.system.width);
  const breadCrumb = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Đang xem" },
    { title: `${items?.name}` },
    { title: `Chương ${item?.chapter_name}` },
  ];

  console.log(">>> item", item);
  console.log(">>> items", items);

  useEffect(() => {
    dispatch(fetchComicInfo({ slug: params?.slug as string }));
  }, [params?.slug]);

  useEffect(() => {
    dispatch(fetchImageComic({ id: params?.id as string }));
  }, [params?.id]);

  useEffect(() => {
    if (items && item?._id || session?.user?.id) {
      dispatch(
        saveComic({
          userId: session?.user?.id as string,
          dataComic: {
            ...item,
            slug: items?.slug,
            thumb_url: items?.thumb_url,
          },
          type: "VIEWED_COMIC",
        })
      );
    }
  }, []);

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
              insetInlineEnd: width > 1024 ? "32px" : "16px",
              insetBlockEnd: width > 1024 ? "32px" : "96px",
            }}
            icon={<ToTopOutlined />}
          />
        </Tooltip>
      </div>
    </Layout>
  );
};

export default Page;
