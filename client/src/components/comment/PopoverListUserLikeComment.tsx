"use client";

import { Popover } from "antd";
import EmptyData from "../common/EmptyData";

interface PopoverUserLikeCommentProps {
  comment: any;
  children: React.ReactNode;
}

const PopoverUserLikeComment = ({
  comment,
  children,
}: PopoverUserLikeCommentProps) => {
  const content = comment?.liked_by_users?.length ? (
    <ul className="flex flex-col gap-2">
      {comment.liked_by_users.map((user: any, index: number) => (
        <li className="text-gray-700 text-xs" key={index}>
          {user?.userName}
        </li>
      ))}
    </ul>
  ) : null;

  return <Popover content={content}>{children}</Popover>;
};

export default PopoverUserLikeComment;
