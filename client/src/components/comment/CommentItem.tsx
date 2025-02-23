"use client";

import CommentActions from "./CommentActions";
import { formatDate, getColorVipLevel } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import CommentEditBox from "./CommentEditBox";
import ShowMoreText from "../common/ShowMoreText";
import { useEffect, useState } from "react";
import Link from "next/link";
import { setShowModalComment } from "@/store/slices/systemSlice";
import { CheckCircleFilled } from "@ant-design/icons";
import { Divider, Tag, Tooltip } from "antd";
import AvatarUser from "../common/AvatarUser";

const CommentItem = ({ comment }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { commentIdEdit } = useSelector((state: RootState) => state.comment);
  const { width } = useSelector((state: RootState) => state.system);
  const [color, setColor] = useState("cyan");

  useEffect(() => {
    setColor(() => getColorVipLevel(comment?.vip_level));
  }, []);

  return (
    <div className="flex gap-4 flex-1">
      <div className="flex flex-col gap-2 items-center">
        <AvatarUser
          size="default"
          number={comment?.vip_level}
          avatar={comment?.avatar ?? "/images/avatar.jpg"}
          type="vip"
          showFrame={true}
        />

        <Tag color={color} className="m-0 text-xs">
          Vip {comment?.vip_level ?? 0}
        </Tag>
      </div>

      <div className="flex flex-col flex-1 gap-1 p-2 rounded-lg border-2 border-gray-100">
        <div className="flex items-center">
          <Tooltip title="Xem trang cá nhân">
            <Link
              onClick={() => dispatch(setShowModalComment(false))}
              href={`/trang-ca-nhan/${comment?.user_id}`}
              className={`"text-base truncate font-semibold hover:underline cursor-pointer
                   ${width > 375 ? "max-w-full" : "max-w-24"}  
                   ${comment.role_name === "admin" && "text-[#13c2c2]"}
                `}
            >
              {comment?.user_name ?? "Không xác định"}{" "}
              {comment.role_name === "admin" && <CheckCircleFilled />}
            </Link>
          </Tooltip>

          {width > 768 && (
            <>
              <Divider type="vertical" />

              <span className="text-gray-700 italic text-xs font-semibold">
                {comment?.nickname}
              </span>
            </>
          )}

          {comment?.chapter !== "" && (
            <>
              <Divider type="vertical" />
              <span className="text-xs text-indigo-700 italic">
                Chương {comment?.chapter ?? 0}
              </span>
            </>
          )}
        </div>

        {comment?.is_spam === 1 ? (
          <span className="italic text-gray-500 text-sm mt-1">
            Bình luận không hiển thị vì được đánh dấu là spam.
          </span>
        ) : (
          <>
            <>
              {commentIdEdit !== comment?.comment_id ? (
                <ShowMoreText
                  text={comment?.content ?? "Không xác định"}
                  maxLength={500}
                />
              ) : (
                <CommentEditBox comment={comment} />
              )}
            </>

            <Divider style={{ margin: "4px 0" }} />

            <div className="flex items-center justify-between gap-6">
              <CommentActions comment={comment} />
              <span className="text-xs text-gray-600 font-semibold">
                {formatDate(comment?.created_at)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
