"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import SkeletonComment from "../skeleton/SkeletonComment";

const CommentList = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      setComments(data);
      setTimeout(() => {
        setLoading(false);  
      }, 3000);
    };

    fetchComments();
  }, []);

  if (loading) {
    return <SkeletonComment />;
  }

  return (
    <ul className="flex flex-col gap-6 mt-4">
      {comments.slice(0, 10).map((comment) => (
        <li key={comment.id} className="flex gap-4">
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
