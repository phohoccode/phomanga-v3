"use client";

import { Avatar, Popover } from "antd";
import Link from "next/link";

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
        <li key={index}>
          <Link
            className="flex gap-2 items-center"
            href={`/trang-ca-nhan/${user?.userId}`}
          >
            <Avatar size="small" src={user?.avatar ?? "/images/avatar.jpg"} />
            <span className="text-gray-700 text-xs truncate hover:underline">
              {user?.userName}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  ) : null;

  return <Popover content={content}>{children}</Popover>;
};

export default PopoverUserLikeComment;
