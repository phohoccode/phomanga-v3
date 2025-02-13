"use client";

import { socket } from "@/lib/socket";
import {
  createComment,
  getComments,
} from "@/store/asyncThunk/commentAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, message } from "antd";

const { TextArea } = Input;

const CommentInput = () => {
  const [value, setValue] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const pathname = usePathname();
  const { data: sesstion } = useSession();
  const [loading, setLoading] = useState(false);
  const { sort } = useSelector((state: RootState) => state.comment);
  const { item } = useSelector((state: RootState) => state.comic.imagesComic);

  const handleCreateComment = async () => {
    if (!sesstion?.user) {
      message.info("Bạn cần đăng nhập để bình luận nhé!");
      return;
    }

    if (value.trim() === "") {
      message.info("Bạn muốn bình luận gì thì viết đi nào!");
      return;
    }

    const chapterName = pathname.startsWith("/thong-tin-truyen")
      ? ""
      : item?.chapter_name;

    setLoading(true);
    const response: any = await dispatch(
      createComment({
        userId: sesstion?.user?.id as string,
        content: value,
        comicSlug: params.slug as string,
        chapter: chapterName,
      })
    );
    setLoading(false);

    if (response.payload?.status === "success") {
      message.success("Ting! Bình luận của bạn đã cập bến an toàn 😎");
      setValue("");

      dispatch(
        getComments({
          comicSlug: params.slug as string,
          limit: 10,
          page: "1",
          sort: sort as "asc" | "desc",
        })
      );

      socket.emit("newComment", {
        slug: params?.slug,
      });
    } else {
      message.error("Có lỗi xảy ra! Vui lòng thử lại sau  🥺");
    }
  };

  return (
    <>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Bạn đang suy nghĩ gì thế ..."
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <Button
        onClick={handleCreateComment}
        loading={loading}
        color="cyan"
        variant="solid"
        style={{ display: "flex", margin: "12px 0 0 auto" }}
      >
        Bình luận
      </Button>
    </>
  );
};

export default CommentInput;
