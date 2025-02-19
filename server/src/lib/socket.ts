import { Server, Socket } from "socket.io";

interface CommentData {
  slug?: string;
}

const initSocketIO = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Kết nối mới", socket.id);

    socket.on("new-comment", (data: CommentData) => {
      console.log("Có bình luận mới!");
      io.emit("refresh-comments", { slug: data?.slug });
    });

    socket.on("update-comment", (data: CommentData) => {
      console.log("Có bình luận vừa cập nhật!");
      io.emit("refresh-comments", { slug: data?.slug });
    });

    socket.on("delete-comment", (data: CommentData) => {
      console.log("Có bình luận vừa xóa!");
      io.emit("refresh-comments", { slug: data?.slug });
    });

    socket.on("like-comment", (data: any) => {
      io.emit("refresh-comments", { slug: data?.slug });

      if (data?.userLikedId !== data?.userCommentId) {
        io.emit("new-notification", {
          message: `${data?.userLikedName} đã thích bình luận "${data?.content}" của bạn`,
          action: "new-notification",
          userLikedId: data?.userLikedId,
          userCommentId: data?.userCommentId,
        });
      }

      io.emit("refresh-notifications", {
        type: "user",
      });
    });

    socket.on("unlike-comment", (data: any) => {
      io.emit("refresh-comments", { slug: data?.slug });
    });

    socket.on("new-notification", () => {
      console.log("Có thông báo mới!");
      io.emit("refresh-notifications", {
        message: "Có thông báo mới từ hệ thống!",
        action: "new-notification",
        type: "system",
      });
    });

    socket.on("delete-notification", () => {
      console.log("Có thông báo vừa xóa!");
      io.emit("refresh-notifications", {
        action: "delete-notification",
        type: "system",
      });
    });

    socket.on("update-notification", () => {
      console.log("Có thông báo vừa cập nhật!");
      io.emit("refresh-notifications", {
        action: "update-notification",
        type: "system",
      });
    });

    socket.on("update-role", (data: any) => {
      console.log("Có người dùng vừa được cập nhật vai trò!");

      const nickname = data?.role === "admin" ? "Admin" : "User";

      io.emit("new-notification", {
        userId: data?.userId,
        message: `Vai trò của bạn vừa được cập nhật thành ${nickname}!`,
      });

      io.emit("refresh-sesstion", {
        userId: data?.userId,
        role: data?.role,
      });

      io.emit("refresh-notifications", {
        type: "user",
      });
    });

    socket.on("update-vip-level", (data: any) => {
      console.log("Có người dùng vừa được cập nhật cấp độ VIP!");
      io.emit("new-notification", {
        userId: data?.userId,
        message: "Cấp độ VIP của bạn vừa được cập nhật!",
      });

      io.emit("refresh-sesstion", {
        userId: data?.userId,
      });

      io.emit("refresh-notifications", {
        type: "user",
      });

      
    });

    socket.on("disconnect", () => {
      console.log("Ngắt kết nối", socket.id);
    });
  });
};

export default initSocketIO;
