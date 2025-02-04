import CommentInput from "./CommentInput";
import CommentTitle from "./CommentTitle";
import CommentList from "./CommentList";

const CommentBox = ({ isScroll = false }: { isScroll?: boolean }) => {
  return (
    <>
      <CommentInput />
      <CommentTitle />
      <CommentList isScroll={isScroll} />
    </>
  );
};

export default CommentBox;
