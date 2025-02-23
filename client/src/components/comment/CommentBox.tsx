"use client";

import CommentInput from "./CommentInput";
import CommentTitle from "./CommentTitle";
import CommentList from "./CommentList";
import RefreshComments from "./RefreshComments";

const CommentBox = () => {
  return (
    <RefreshComments>
      <CommentInput />
      <CommentTitle />
      <CommentList />
    </RefreshComments>
  );
};

export default CommentBox;
