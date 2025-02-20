"use client";

import { socket } from "@/lib/socket";
import { scrollToCurrentElement } from "@/lib/utils";
import { getComments } from "@/store/asyncThunk/commentAsyncThunk";
import { setIsScroll } from "@/store/slices/commentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { message } from "antd";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const RefreshComments = ({ children }: { children: React.ReactNode }) => {
  const { sort, currentPage, items, isScroll } = useSelector(
    (state: RootState) => state.comment
  );
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const { data: session } = useSession();
  const currentScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("refresh-comments", (res) => {
      if (res?.slug === params?.slug) {
        console.log("RefreshComments");
        handleGetComments();
      }
    });

    socket.on("refresh-sesstion", (res) => {
      const isExist = items?.some((item) => item.user_id === res?.userId);

      if (isExist) {
        console.log("RefreshSession");
        handleGetComments();
      }
    });

    return () => {
      socket.off("refresh-comments");
      socket.off("refresh-sesstion");
    };
  }, [session]);

  useEffect(() => {
    handleGetComments();
  }, [currentPage, sort]);

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

  useEffect(() => {
    if (isScroll && currentScrollRef.current) {
      setTimeout(() => {
        scrollToCurrentElement(currentScrollRef);
        dispatch(setIsScroll(false));
      }, 1000);
    }
  }, [isScroll]);

  return <div ref={currentScrollRef}>{children}</div>;
};

export default RefreshComments;
