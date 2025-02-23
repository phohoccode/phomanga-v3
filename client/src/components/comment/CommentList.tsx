"use client";

import CommentItem from "./CommentItem";
import SkeletonComment from "../skeleton/SkeletonComment";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyData from "../common/EmptyData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setCurrentPage, setIsScroll } from "@/store/slices/commentSlice";
import useGetQuery from "@/hooks/useGetQuery";
import { Pagination } from "antd";

const CommentList = () => {
  const { items, loading, totalItems } = useSelector(
    (state: RootState) => state.comment
  );
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useGetQuery("comment-page", "1", "number");
  const searchParams = useSearchParams();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("comment-page", page.toString());
    router.push(`?${params.toString()}`);

    dispatch(setCurrentPage(page.toString()));
    dispatch(setIsScroll(true));
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
      <ul className="flex flex-col gap-6">
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
