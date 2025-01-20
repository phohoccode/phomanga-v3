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

    socket.on("likeComment", (data: CommentData) => {
      console.log("Có bình luận vừa xóa!");
      io.emit("refreshComments", { slug: data?.slug });
    });

    socket.on("unlikeComment", (data: CommentData) => {
      console.log("Có bình luận vừa xóa!");
      io.emit("refreshComments", { slug: data?.slug });
    });
  });
};

export default initSocketIO;
