"use client";

import ComicList from "@/components/ComicList";
import ComicTitle from "@/components/ComicTitle";
import ButtonLink from "@/components/common/ButtonLink";
import SlideList from "@/components/SlideList";
import {
  fetchCompletedComic,
  fetchNewComic,
  fetchPublishedComic,
  fetchUpComingComic,
} from "@/store/asyncThunk/comic";
import { AppDispatch, RootState } from "@/store/store";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { items: newComic, loading: newComicLoading } = useSelector(
    (state: RootState) => state.comic.newComic
  );
  const { items: publishedComic, loading: publishedComicLoading } = useSelector(
    (state: RootState) => state.comic.publishedComic
  );
  const { items: upComingComic, loading: upComingComicLoading } = useSelector(
    (state: RootState) => state.comic.upComingComic
  );
  const { items: completedComic, loading: completedComicLoading } = useSelector(
    (state: RootState) => state.comic.completedComic
  );

  useEffect(() => {
    dispatch(fetchNewComic());
    dispatch(fetchPublishedComic());
    dispatch(fetchUpComingComic());
    dispatch(fetchCompletedComic());
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <SlideList />

      <ComicTitle
        title="Truyện sắp ra mắt"
        orientation="center"
        loading={upComingComicLoading}
      />
      <ComicList data={upComingComic} loading={upComingComicLoading} />
      <ButtonLink
        href={`/chi-tiet/danh-sach/sap-ra-mat`}
        text="Xem thêm"
        showIcon={true}
        positionIcon="end"
        positionItem="end"
        icon={<ArrowRightOutlined />}
      />

      <ComicTitle
        title="Truyện mới ra mắt"
        orientation="center"
        loading={newComicLoading}
      />
      <ComicList data={newComic} loading={newComicLoading} />
      <ButtonLink
        href={`/chi-tiet/danh-sach/moi-ra-mat`}
        text="Xem thêm"
        showIcon={true}
        positionIcon="end"
        positionItem="end"
        icon={<ArrowRightOutlined />}
      />

      <ComicTitle
        title="Truyện đang phát hành"
        orientation="center"
        loading={publishedComicLoading}
      />
      <ComicList data={publishedComic} loading={publishedComicLoading} />
      <ButtonLink
        href={`/chi-tiet/danh-sach/dang-phat-hanh`}
        text="Xem thêm"
        showIcon={true}
        positionIcon="end"
        positionItem="end"
        icon={<ArrowRightOutlined />}
      />

      <ComicTitle
        title="Truyện đã hoàn thành"
        orientation="center"
        loading={completedComicLoading}
      />
      <ComicList data={completedComic} loading={completedComicLoading} />
      <ButtonLink
        href={`/chi-tiet/danh-sach/da-hoan-thanh`}
        text="Xem thêm"
        showIcon={true}
        positionIcon="end"
        positionItem="end"
        icon={<ArrowRightOutlined />}
      />
    </div>
  );
}
