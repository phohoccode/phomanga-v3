"use client";

import { Col, message, Row } from "antd";
import ComicItem from "@/components/ComicItem";
import SkeletonComicList from "@/components/skeleton/SkeletonComicList";
import EmptyData from "@/components/ui/EmptyData";
import type { ComicList } from "@/lib/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { deleteComic } from "@/store/asyncThunk/userAsyncThunk";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ComicList = ({ data, loading }: ComicList) => {
  const dispatch: AppDispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteComic = async (slug?: string, id?: string) => {
    let res: any = null;

    if (pathname === "/kho-luu-tru") {
      setLoadingDelete(slug as string);

      res = await dispatch(
        deleteComic({
          userId: session?.user?.id as string,
          comicSlug: slug,
          type: "SAVED_COMIC",
        })
      );

      setLoadingDelete("");
    } else {
      setLoadingDelete(id as string);
      res = await dispatch(
        deleteComic({
          userId: session?.user?.id as string,
          comicSlug: slug,
          comicId: id,
          type: "VIEWED_COMIC",
        })
      );

      setLoadingDelete("");
    }

    if (res?.payload?.status === "success") {
      message.success("Bỏ lưu truyện thành công!");
      router.refresh();
    } else {
      message.error("Bỏ lưu truyện thất bại!");
    }
  };

  if (loading) {
    return <SkeletonComicList quantity={24} />;
  }

  if (!data && !loading) {
    return <EmptyData description="Không có dữ liệu" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {data?.map((comic: any, index: number) => (
        <Col key={index} xs={12} sm={8} md={6} lg={4} xl={3} xxl={2}>
          <ComicItem
            data={comic}
            onClickDelete={handleDeleteComic}
            loading={
              loadingDelete === comic.slug || loadingDelete === comic._id
            }
          />
        </Col>
      ))}
    </Row>
  );
};

export default ComicList;
