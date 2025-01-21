"use client";

import { Col, message, Row } from "antd";
import SkeletonComicList from "@/components/skeleton/SkeletonComicList";
import EmptyData from "@/components/common/EmptyData";
import type { ComicList } from "@/lib/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { deleteComic } from "@/store/asyncThunk/userAsyncThunk";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ComicItem from "./ComicItem";

const ComicList = ({
  data,
  loading,
  description,
  sm,
  xs,
  xl,
  md,
  lg,
  xxl,
}: ComicList) => {
  const dispatch: AppDispatch = useDispatch();
  const [key, setKey] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteComic = async (slug?: string, id?: string) => {
    let res: any = null;

    setKey(pathname === "/kho-luu-tru" ? (slug as string) : (id as string));

    res = await dispatch(
      deleteComic({
        userId: session?.user?.id as string,
        comicSlug: slug,
        comicId: id,
        type: pathname === "/kho-luu-tru" ? "SAVED_COMIC" : "VIEWED_COMIC",
      })
    );

    if (res?.payload?.status === "success") {
      router.refresh();
    } else {
      message.error(res?.payload?.message);
    }
  };

  if (loading) {
    return <SkeletonComicList quantity={24} />;
  }

  if ((data?.length === 0 || !data) && !loading) {
    return <EmptyData description={description ?? "Không có dữ liệu"} />;
  }

  return (
    <Row gutter={[16, 16]}>
      {data?.map((comic: any, index: number) => (
        <Col
          key={index}
          xs={xs ?? 12}
          sm={sm ?? 8}
          md={md ?? 6}
          lg={lg ?? 4}
          xl={xl ?? 3}
          xxl={xxl ?? 2}
        >
          <ComicItem
            data={comic}
            onClickDelete={handleDeleteComic}
            loading={key === comic.slug || key === comic.id}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ComicList;
