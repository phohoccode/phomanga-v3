"use client";

import { useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import SkeletonComment from "../skeleton/SkeletonComment";
import { Pagination } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import EmptyData from "../common/EmptyData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getComments } from "@/store/asyncThunk/commentAsyncThunk";
import { setCurrentPage } from "@/store/slices/commentSlice";
import useGetQuery from "@/hooks/useGetQuery";
import { scrollToCurrentElement } from "@/lib/utils";

const CommentList = ({ isScroll = false }: { isScroll?: boolean }) => {
  const { items, loading, totalItems, sort } = useSelector(
    (state: RootState) => state.comment
  );
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentPage = useGetQuery("comment_page", "1", "number");
  const currentScrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    handleGetComments();
    dispatch(setCurrentPage(currentPage as string));
  }, [currentPage, sort]);

  const handleGetComments = async () => {
    await dispatch(
      getComments({
        comicSlug: params?.slug as string,
        limit: 10,
        page: currentPage as string,
        sort: sort as "asc" | "desc",
      })
    );
  };

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("comment_page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <SkeletonComment />;
  }

  if (items?.length === 0) {
    return (
      <EmptyData description="Có vẻ như mọi người đang tập trung vào câu chuyện hơn là viết bình luận!" />
    );
  }

  return (
    <>
      <ul
        ref={currentScrollRef}
        className={`flex flex-col gap-6 mt-4 ${
          isScroll ? "max-h-60 overflow-y-auto" : ""
        }`}
      >
        {items?.map((comment, index) => (
          <li key={index} className="flex gap-4">
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>

      {totalItems > 10 && (
        <Pagination
          style={{ marginTop: "48px" }}
          align="center"
          onChange={handleChangePage}
          showTitle={true}
          showSizeChanger={false}
          current={Number(currentPage)}
          total={totalItems}
          pageSize={10}
        />
      )}
    </>
  );
};

export default CommentList;
