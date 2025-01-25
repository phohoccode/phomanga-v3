"use client";

import { Divider } from "antd";
import CommentActions from "./CommentActions";
import { formatDate } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CommentEditBox from "./CommentEditBox";
import ShowMoreText from "../common/ShowMoreText";
import { CheckCircleFilled } from "@ant-design/icons";

const CommentItem = ({ comment }: any) => {
  const { commentIdEdit } = useSelector((state: RootState) => state.comment);

  return (
    <div className="flex gap-4">
      <figure className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden">
        <img src="/avatar-default.jpg" alt="avartar" />
      </figure>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span
            className={`"text-base font-semibold ${
              comment.role_name === "admin" ? "text-[#13c2c2]" : ""
            }`}
          >
            {comment?.user_name ?? "Không xác định"}{" "}
            {comment.role_name === "admin" && <CheckCircleFilled />}
          </span>
          <span className="text-xs text-gray-600 font-semibold">
            {formatDate(comment?.created_at)}
          </span>
        </div>

        {commentIdEdit !== comment?.comment_id ? (
          <ShowMoreText
            text={comment?.content ?? "Không xác định"}
            maxLength={200}
          />
        ) : (
          <CommentEditBox comment={comment} />
        )}

        <>
          <Divider style={{ margin: "4px 0" }} />
          <CommentActions comment={comment} />
        </>
      </div>
    </div>
  );
};

export default CommentItem;
