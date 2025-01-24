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
          action: "like-comment",
          userLikedId: data?.userLikedId,
          userCommentId: data?.userCommentId,
        });
      }
    });

    socket.on("unlikeComment", (data: any) => {
      io.emit("refreshComments", { slug: data?.slug });
    });

    socket.on("newNotification", () => {
      console.log("Có thông báo mới!");
      io.emit("refreshNotifications", {
        message: "Có thông báo mới!",
        action: "new-notification",
      });
    });

    socket.on("deteleNotification", () => {
      console.log("Có thông báo vừa xóa!");
      io.emit("refreshNotifications", {
        message: "Có thông báo vừa xóa!",
        action: "delete-notification",
      });
    });

    socket.on("updateNotification", () => {
      console.log("Có thông báo vừa cập nhật!");
      io.emit("refreshNotifications", {
        message: "Có thông báo vừa cập nhật!",
        action: "update-notification",
      });
    });
  });
};

export default initSocketIO;
