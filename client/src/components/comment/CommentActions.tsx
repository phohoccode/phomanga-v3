"use client";

import { socket } from "@/lib/socket";
import {
  deleteComment,
  getComments,
  likeComment,
  unlikeComment,
} from "@/store/asyncThunk/commentAsyncThunk";
import { createNotification } from "@/store/asyncThunk/notificationAsyncThunk";
import { setCommentIdEdit } from "@/store/slices/commentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { DashOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message } from "antd";

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
      const response: any = await dispatch(
        deleteComment({
          commentId: comment?.comment_id,
          userId: sesstion?.user?.id as string,
        })
      );

      if (response.payload?.status === "success") {
        message.success("Ú òa! Bình luận đã bay màu! 🚀");

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
    if (!sesstion) {
      message.info("Bạn cần đăng nhập để thực hiện nhé!");
      return;
    }

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
      socket.emit(action === "like" ? "likeComment" : "unlikeComment", {
        slug: params?.slug,
        userLikedName: sesstion?.user?.name,
        userLikedId: sesstion?.user?.id,
        userCommentId: comment?.user_id,
        content: comment?.content,
      });

      if (sesstion?.user?.id !== comment?.user_id) {
        await dispatch(
          createNotification({
            title: "like-comment",
            content: `${sesstion?.user?.name} đã thích bình luận "${comment?.content}" của bạn`,
            type: "user",
            userId: comment?.user_id,
          })
        );
      }

      await handleGetComments();
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
    <div className="flex gap-2 ml-[-7px]">
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
