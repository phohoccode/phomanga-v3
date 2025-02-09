"use client";

import { Avatar, Divider, Tag, Tooltip } from "antd";
import CommentActions from "./CommentActions";
import { formatDate } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import CommentEditBox from "./CommentEditBox";
import ShowMoreText from "../common/ShowMoreText";
import { CheckCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { setShowModalComment } from "@/store/slices/systemSlice";

const CommentItem = ({ comment }: any) => {
  const dispatch: AppDispatch = useDispatch();
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
      <Avatar src={comment?.user_avatar ?? "/images/avatar.jpg"} alt="avatar" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <Tooltip title="Xem trang cá nhân">
            <Link
              onClick={() => dispatch(setShowModalComment(false))}
              href={`/trang-ca-nhan/${comment?.user_id}`}
              className={`"text-base font-semibold hover:underline cursor-pointer ${
                comment.role_name === "admin" ? "text-[#13c2c2]" : ""
              }`}
            >
              {comment?.user_name ?? "Không xác định"}{" "}
              {comment.role_name === "admin" && <CheckCircleFilled />}
            </Link>
          </Tooltip>

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
