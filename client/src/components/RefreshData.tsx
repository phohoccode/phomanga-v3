"use client";

import useGetQuery from "@/hooks/useGetQuery";
import { socket } from "@/lib/socket";
import { getComments } from "@/store/asyncThunk/commentAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RefreshData = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { sort } = useSelector((state: RootState) => state.comment);
  const currentPage = useGetQuery("comment_page", "1", "number");

  useEffect(() => {
    socket.on("refreshComments", (res) => {
      if (res?.slug === params?.slug) {
        handleGetComments();
      }
    });

    return () => {
      socket.off("refreshComments");
    };
  }, []);

  const handleGetComments = () => {
    dispatch(
      getComments({
        comicSlug: params?.slug as string,
        limit: 10,
        page: currentPage as string,
        sort: sort as "asc" | "desc",
      })
    );
  };

  return <>{children}</>;
};

export default RefreshData;
