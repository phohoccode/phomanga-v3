"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import SkeletonComment from "../skeleton/SkeletonComment";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { isPositiveInteger } from "@/lib/utils";
import EmptyData from "../ui/EmptyData";

const CommentList = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = isPositiveInteger(
    searchParams.get("comment_page") as string
  )
    ? searchParams.get("comment_page")
    : "1";

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=10`
      );
      const data = await response.json();
      setComments(data);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    fetchComments();
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("comment_page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <SkeletonComment />;
  }

  if (comments?.length !== 0) {
    return <EmptyData description="Chưa có bình luận nào" />;
  }

  return (
    <div>
      <ul className="flex flex-col gap-6 mt-4">
        {comments?.map((comment) => (
          <li key={comment.id} className="flex gap-4">
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>

      <Pagination
        style={{ marginTop: "48px" }}
        align="center"
        onChange={handleChangePage}
        showTitle={true}
        showSizeChanger={false}
        current={Number(currentPage)}
        total={200}
        pageSize={10}
      />
    </div>
  );
};

export default CommentList;
