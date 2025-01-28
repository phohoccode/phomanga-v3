"use client";

import { useEffect } from "react";
import CommentItem from "./CommentItem";
import SkeletonComment from "../skeleton/SkeletonComment";
import { Pagination } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { isPositiveInteger } from "@/lib/utils";
import EmptyData from "../common/EmptyData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getComments } from "@/store/asyncThunk/commentAsyncThunk";
import { setCurrentPage } from "@/store/slices/commentSlice";
import { socket } from "@/lib/socket";

const CommentList = () => {
  const { items, loading, totalItems, sort } = useSelector(
    (state: RootState) => state.comment
  );
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentPage = isPositiveInteger(
    searchParams.get("comment_page") as string
  )
    ? searchParams.get("comment_page")
    : "1";

  useEffect(() => {
    socket.on("refreshComments", (res) => {
      if (res?.slug === params?.slug) {
        handleGetComments();
      }
    });

    return () => {
      socket.off("refreshComments");
    };
  }, []);

  useEffect(() => {
    handleGetComments();

    dispatch(setCurrentPage(currentPage as string));
  }, [currentPage, sort]);

  const handleGetComments = () => {
    dispatch(
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
    return <EmptyData description="Chưa có bình luận nào tại đây" />;
  }

  return (
    <>
      <ul className="flex flex-col gap-6 mt-4">
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
