"use client";

import { socket } from "@/lib/socket";
import {
  deleteComment,
  getComments,
  likeComment,
  unlikeComment,
} from "@/store/asyncThunk/commentAsyncThunk";
import { setCommentIdEdit } from "@/store/slices/commentSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  DashOutlined,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message } from "antd";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CommentActions = ({ comment }: any) => {
  const { data: sesstion } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const { currentPage, sort } = useSelector(
    (state: RootState) => state.comment
  );

  const items: MenuProps["items"] = [
    {
      label: "Xoá bình luận",
      key: "0",
    },
    {
      label: "Sửa bình luận",
      key: "1",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    if (e.key === "0") {
      console.log(comment);

      const response: any = await dispatch(
        deleteComment({
          commentId: comment?.comment_id,
        })
      );

      if (response.payload?.status === "success") {
        message.success("Xoá bình luận thành công!");

        handleGetComments();

        socket.emit("deleteComment", {
          slug: params?.slug,
        });
      }
    } else if (e.key === "1") {
      dispatch(setCommentIdEdit(comment?.comment_id));
    }
  };

  const handleActionsLike = async (action: string) => {
    const response: any = await dispatch(
      action === "like"
        ? likeComment({
            commentId: comment?.comment_id,
            userId: sesstion?.user?.id as string,
          })
        : unlikeComment({
            commentId: comment?.comment_id,
            userId: sesstion?.user?.id as string,
          })
    );

    if (response.payload?.status === "success") {
      handleGetComments();

      socket.emit(action === "like" ? "likeComment" : "unlikeComment", {
        slug: params?.slug,
      });
    }
  };

  const handleGetComments = () => {
    dispatch(
      getComments({
        comicSlug: params.slug as string,
        limit: 10,
        page: currentPage as string,
        sort: sort as "asc" | "desc",
      })
    );
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="flex gap-2">
      {comment?.liked_by_users?.some(
        (user: any) => user.userId === sesstion?.user?.id
      ) ? (
        <Button
          onClick={() => handleActionsLike("unlike")}
          type="text"
          size="small"
          icon={<LikeFilled />}
        >
          {comment?.like_count}
        </Button>
      ) : (
        <Button
          onClick={() => handleActionsLike("like")}
          type="text"
          size="small"
          icon={<LikeOutlined />}
        >
          {comment?.like_count}
        </Button>
      )}

      {sesstion?.user?.id === comment?.user_id && (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button type="text" size="small" icon={<DashOutlined />} />
        </Dropdown>
      )}
    </div>
  );
};

export default CommentActions;
