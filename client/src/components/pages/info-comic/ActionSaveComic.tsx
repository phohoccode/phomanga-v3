"use client";

import {
  deleteComic,
  getAllComic,
  saveComic,
} from "@/store/asyncThunk/userAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { BookOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ActionSaveComic = () => {
  const { data: session }: any = useSession();
  const [isSave, setIsSave] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.user.savedComics);
  const { items: comicInfo } = useSelector(
    (state: RootState) => state.comic.comicInfo
  );
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getDataSavedComic = () => {
      if (session?.user?.id) {
        dispatch(
          getAllComic({
            userId: session.user.id,
            type: "GET_ALL_SAVED_COMIC",
          })
        );
      }
    };

    getDataSavedComic();
  }, [params?.slug, session?.user?.id]);

  useEffect(() => {
    if (items?.length > 0) {
      const isSave = items.find((item) => item.slug === params.slug);
      setIsSave(isSave);
    }
  }, [items, params?.slug]);

  const handleSaveComic = async () => {
    if (!session?.user?.id) {
      message.error("Bạn phải đăng nhập để lưu truyện!");
      return;
    }

    const maxStories = session?.user?.max_stories;

    if (items?.length >= maxStories) {
      message.info(
        `Bạn chỉ được lưu tối đa ${maxStories} truyện! Nâng cấp VIP để lưu nhiều hơn!`
      );
      return;
    }

    const chaprerLasted = comicInfo?.chapters?.[0]?.server_data;

    setIsLoading(true);

    const res: any = await dispatch(
      saveComic({
        userId: session?.user?.id,
        dataComic: {
          id: chaprerLasted?.[chaprerLasted?.length - 1]?.chapter_api_data
            ?.split("/")
            .pop(),
          chapter_name:
            chaprerLasted?.[chaprerLasted?.length - 1]?.chapter_name,
          slug: comicInfo?.slug,
          name: comicInfo?.name,
          thumb_url: comicInfo?.thumb_url,
          createdAt: new Date().toISOString(),
        },
        type: "SAVED_COMIC",
      })
    );
    setIsLoading(false);

    if (res?.payload?.status === "success") {
      message.success("Truyện đã được ném vào kho lưu trữ!");
      await dispatch(
        getAllComic({
          userId: session?.user?.id,
          type: "GET_ALL_SAVED_COMIC",
        })
      );
      setIsSave(true);
    } else {
      message.error("Lưu truyện thất bại!");
    }
  };

  const handleDeleteComic = async () => {
    if (!session?.user?.id) {
      message.error("Bạn phải đăng nhập để bỏ lưu truyện!");
      return;
    }

    setIsLoading(true);
    const res: any = await dispatch(
      deleteComic({
        userId: session?.user?.id,
        comicSlug: params?.slug as string,
        type: "SAVED_COMIC",
      })
    );
    setIsLoading(false);

    if (res?.payload?.status === "success") {
      message.success("Truyện đã bị vứt ra khỏi kho lưu trữ!");
      await dispatch(
        getAllComic({
          userId: session?.user?.id,
          type: "GET_ALL_SAVED_COMIC",
        })
      );
      setIsSave(false);
    } else {
      message.error("Bỏ lưu truyện thất bại!");
    }
  };

  return (
    <Tooltip placement="top" title={isSave ? "Bỏ vội!" : "Lưu ngay thôi!"}>
      {!isSave ? (
        <Button
          loading={isLoading}
          onClick={() => handleSaveComic()}
          icon={<BookOutlined />}
          variant="filled"
          color="blue"
        />
      ) : (
        <Button
          loading={isLoading}
          onClick={() => handleDeleteComic()}
          icon={<DeleteOutlined />}
          variant="filled"
          color="red"
        />
      )}
    </Tooltip>
  );
};

export default ActionSaveComic;
