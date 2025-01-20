import { Divider } from "antd";
import CommentInput from "./CommentInput";
import CommentTitle from "./CommentTitle";
import CommentList from "./CommentList";

const CommentBox = () => {
  return (
    <div className="flex flex-col gap-2 mt-12 ">
      <Divider orientation="left">Bình luận</Divider>
      <CommentInput />
      <CommentTitle />
      <CommentList />
    </div>
  );
};

export default CommentBox;
