"use client";

import { socket } from "@/lib/socket";
import {
  getComments,
  updateComment,
} from "@/store/asyncThunk/commentAsyncThunk";
import { setCommentIdEdit } from "@/store/slices/commentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, message } from "antd";

const { TextArea } = Input;

const CommentEditBox = ({ comment }: any) => {
  const [value, setValue] = useState(comment?.content);
  const dispatch: AppDispatch = useDispatch();
  const { currentPage, sort } = useSelector(
    (state: RootState) => state.comment
  );
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextAreaRef | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      // lấy ra thẻ textarea từ inputRef
      const textArea = inputRef.current.resizableTextArea?.textArea;
      const length = textArea?.value.length ?? 0;

      textArea?.focus();
      textArea?.setSelectionRange(length, length);
    }
  }, []);

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
      message.success("Cập nhật xong, sẵn sàng nhận like thôi! 😎");
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
        ref={inputRef}
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
