import { Divider } from "antd";
import CommentActions from "./CommentActions";

const CommentItem = ({ comment }: any) => {
  return (
    <div>
      <div className="flex gap-4">
        <figure className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden">
          <img src="/avatar-default.jpg" alt="avartar" />
        </figure>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-base font-semibold">{comment.name} - {comment.id}</span>
            <span className="text-xs text-gray-600 font-semibold">
              36 phút trước
            </span>
          </div>
          <p>{comment.body}</p>
          <Divider style={{ margin: "4px 0" }} />
          <CommentActions />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
