"use client";

import { markUserCommentAsSpam } from "@/lib/actions/admin";
import { socket } from "@/lib/socket";
import { createNotification } from "@/store/asyncThunk/notificationAsyncThunk";
import { AppDispatch } from "@/store/store";
import { Checkbox, CheckboxProps, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface MarkUserCommentAsSpamProps {
  data: any;
}

const MarkUserCommentAsSpam = ({ data }: MarkUserCommentAsSpamProps) => {
  const [isSpam, setIsSpam] = useState(data?.isSpam);
  const dispatch: AppDispatch = useDispatch();

  const onChange: CheckboxProps["onChange"] = async (e) => {
    if (data?.isDeleted === "Đã xóa") {
      message.error("Không thể đánh dấu spam bình luận đã bị xóa");
      return;
    }

    const responseMarkUAsSpam: any = await markUserCommentAsSpam(data?.id);

    if (responseMarkUAsSpam?.status === "success") {
      setIsSpam(e.target.checked);
      message.info(responseMarkUAsSpam?.message);

      socket.emit("mark-comment-as-spam", {
        slug: data?.slug,
        userId: data?.userId,
        isSpam: e.target.checked,
      });

      if (e.target.checked) {
        await handleCreateNotification();
      }
    } else {
      message.error(responseMarkUAsSpam?.message || "Có lỗi xảy ra!");
    }
  };

  const handleCreateNotification = async () => {
    const content = `
      Bình luận "${data?.content}" tại truyện
      "${data?.comicName}" của bạn đã bị Admin đánh dấu là spam.
    `;

    await dispatch(
      createNotification({
        title: "mark-comment-spam",
        content,
        userId: data?.userId,
        type: "user",
      })
    );
  };

  return (
    <Checkbox
      disabled={data?.isDeleted === "Đã xóa"}
      onChange={onChange}
      checked={isSpam}
    />
  );
};

export default MarkUserCommentAsSpam;
