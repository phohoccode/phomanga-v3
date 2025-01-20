"use client";

import { socket } from "@/lib/socket";
import {
  getComments,
  updateComment,
} from "@/store/asyncThunk/commentAsyncThunk";
import { setCommentIdEdit } from "@/store/slices/commentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Button, Input, message } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { TextArea } = Input;

const CommentEditBox = ({ comment }: any) => {
  const [value, setValue] = useState(comment?.content);
  const dispatch: AppDispatch = useDispatch();
  const { currentPage, sort } = useSelector(
    (state: RootState) => state.comment
  );
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleSaveEditComment = async () => {
    if (value.trim() === "") {
      message.info("Bạn muốn bình luận gì thì viết đi nào!");
      return;
    }

    setLoading(true);
    const response: any = await dispatch(
      updateComment({
        commentId: comment?.comment_id,
        content: value,
      })
    );
    setLoading(false);

    if (response.payload?.status === "success") {
      message.success("Cập nhật bình luận thành công!");
      dispatch(setCommentIdEdit(""));

      dispatch(
        getComments({
          comicSlug: params.slug as string,
          limit: 10,
          page: currentPage as string,
          sort: sort as "asc" | "desc",
        })
      );

      socket.emit("updateComment", {
        slug: params?.slug,
      });
    }
  };

  return (
    <div className="flex gap-4 w-full">
      <TextArea
        variant="filled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Bạn đang suy nghĩ gì thế ..."
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => dispatch(setCommentIdEdit(""))} type="text">
          Huỷ
        </Button>
        <Button
          loading={loading}
          onClick={() => handleSaveEditComment()}
          type="text"
          color="cyan"
          variant="solid"
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default CommentEditBox;
