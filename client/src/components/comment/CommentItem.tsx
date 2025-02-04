"use client";

import { Divider, Tag } from "antd";
import CommentActions from "./CommentActions";
import { formatDate } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CommentEditBox from "./CommentEditBox";
import ShowMoreText from "../common/ShowMoreText";
import { CheckCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";

const CommentItem = ({ comment }: any) => {
  const { commentIdEdit } = useSelector((state: RootState) => state.comment);
  const [color, setColor] = useState("cyan");

  useEffect(() => {
    switch (comment?.vip_level) {
      case 1:
        setColor("cyan");
        break;
      case 2:
        setColor("green");
        break;
      case 3:
        setColor("gold");
        break;
      case 4:
        setColor("purple");
        break;
      case 5:
        setColor("red");
        break;
      default:
        setColor("cyan");
        break;
    }
  }, []);

  return (
    <div className="flex gap-4">
      <figure className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden">
        <img src="/avatar-default.jpg" alt="avartar" />
      </figure>

      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span
            className={`"text-base font-semibold ${
              comment.role_name === "admin" ? "text-[#13c2c2]" : ""
            }`}
          >
            {comment?.user_name ?? "Không xác định"}{" "}
            {comment.role_name === "admin" && <CheckCircleFilled />}
          </span>

          <Divider type="vertical" />
          
          <Tag color={color} style={{ margin: 0 }}>
            Vip {comment?.vip_level ?? 0}
          </Tag>

          {comment?.chapter !== "" && (
            <>
              <Divider type="vertical" />
              <span className="text-xs text-indigo-700 italic">
                Chương {comment?.chapter ?? 0}
              </span>
            </>
          )}
        </div>

        {commentIdEdit !== comment?.comment_id ? (
          <ShowMoreText
            text={comment?.content ?? "Không xác định"}
            maxLength={200}
          />
        ) : (
          <CommentEditBox comment={comment} />
        )}

        <Divider style={{ margin: "4px 0" }} />
        <div className="flex items-center justify-between gap-6">
          <CommentActions comment={comment} />
          <span className="text-xs text-gray-600 font-semibold">
            {formatDate(comment?.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
