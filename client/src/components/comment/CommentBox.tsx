"use client";

import CommentInput from "./CommentInput";
import CommentTitle from "./CommentTitle";
import CommentList from "./CommentList";
import RefreshComments from "./RefreshComments";

const CommentBox = ({ isScroll = false }: { isScroll?: boolean }) => {
  return (
    <RefreshComments>
      <CommentInput />
      <CommentTitle />
      <CommentList isScroll={isScroll} />
    </RefreshComments>
  );
};

export default CommentBox;
