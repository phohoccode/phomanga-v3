import { Server, Socket } from "socket.io";

interface CommentData {
  slug?: string;
}

const initSocketIO = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Kết nối mới", socket.id);

    socket.on("newComment", (data: CommentData) => {
      console.log("Có bình luận mới!");
      io.emit("refreshComments", { slug: data?.slug });
    });

    socket.on("updateComment", (data: CommentData) => {
      console.log("Có bình luận vừa cập nhật!");
      io.emit("refreshComments", { slug: data?.slug });
    });

    socket.on("deleteComment", (data: CommentData) => {
      console.log("Có bình luận vừa xóa!");
      io.emit("refreshComments", { slug: data?.slug });
    });

    socket.on("likeComment", (data: any) => {
      io.emit("refreshComments", { slug: data?.slug });

      if (data?.userLikedId !== data?.userCommentId) {
        io.emit("newNotification", {
          message: `${data?.userLikedName} đã thích bình luận "${data?.content}" của bạn`,
          action: "new-notification",
          userLikedId: data?.userLikedId,
          userCommentId: data?.userCommentId,
        });
      }

      io.emit("refreshNotifications", {
        type: "user",
      });
    });

    socket.on("unlikeComment", (data: any) => {
      io.emit("refreshComments", { slug: data?.slug });
    });

    socket.on("newNotification", () => {
      console.log("Có thông báo mới!");
      io.emit("refreshNotifications", {
        message: "Có thông báo mới từ hệ thống!",
        action: "new-notification",
        type: "system",
      });
    });

    socket.on("deleteNotification", () => {
      console.log("Có thông báo vừa xóa!");
      io.emit("refreshNotifications", {
        action: "delete-notification",
        type: "system",
      });
    });

    socket.on("updateNotification", () => {
      console.log("Có thông báo vừa cập nhật!");
      io.emit("refreshNotifications", {
        action: "update-notification",
        type: "system",
      });
    });

    socket.on("disconnect", () => {
      console.log("Ngắt kết nối", socket.id);
    });
  });
};

export default initSocketIO;
