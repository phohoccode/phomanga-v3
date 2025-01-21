"use client";

import EmptyData from "@/components/common/EmptyData";
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
import { Breadcrumb, FloatButton } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveComic } from "@/store/asyncThunk/userAsyncThunk";
import { useSession } from "next-auth/react";
import FloatButtonGroup from "@/components/read-page/FloatButtonGroup";

const Page = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { item, loading } = useSelector(
    (state: RootState) => state.comic.imagesComic
  );
  const { savingHistory } = useSelector((state: RootState) => state.system);
  const { data: session } = useSession();
  const { items } = useSelector((state: RootState) => state.comic.comicInfo);
  const width = useSelector((state: RootState) => state.system.width);
  const breadCrumb = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Đang xem" },
    { title: `${items?.name}` },
    { title: `Chương ${item?.chapter_name}` },
  ];

  useEffect(() => {
    const handleInit = async () => {
      const [resInfo, resImages] = await Promise.all([
        dispatch(fetchComicInfo({ slug: params?.slug as string })),
        dispatch(fetchImageComic({ id: params?.id as string })),
      ]);

      if (
        resInfo?.payload?.status === "success" &&
        resImages?.payload?.status === "success" &&
        savingHistory
      ) {
        const dataComicInfo = resInfo?.payload?.data?.item;
        const dataChapterComic = resImages?.payload?.data?.item;

        const { slug, name, thumb_url } = dataComicInfo;
        const { chapter_name, _id } = dataChapterComic;

        if (
          slug &&
          name &&
          thumb_url &&
          chapter_name &&
          _id &&
          session?.user?.id
        ) {
          dispatch(
            saveComic({
              userId: session?.user?.id as string,
              dataComic: {
                id: _id,
                chapter_name: chapter_name,
                name: name,
                slug: slug,
                thumb_url: thumb_url,
                createdAt: new Date().toISOString(),
              },
              type: "VIEWED_COMIC",
            })
          );
        }
      }
    };

    handleInit();
  }, [params?.slug, params?.id]);

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

        {width < 1024 && (
          <SesstionControls
            location="bottom"
            dataInfoComic={items}
            dataChapterComic={item}
          />
        )}

        <FloatButtonGroup />
      </div>
    </Layout>
  );
};

export default Page;
