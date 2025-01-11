"use client";

import { formatDate } from "@/lib/utils";
import { fetchComicDetail } from "@/store/asyncThunk/comic";
import { AppDispatch, RootState } from "@/store/store";
import { Divider } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ComicSuggesion = ({ slug }: { slug: string }) => {
  const catetorys = useSelector((state: RootState) => state.comic.catetorys);
  const { items } = useSelector((state: RootState) => state.comic.comicDetail);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(
        fetchComicDetail({
          description: "the-loai",
          slug: slug?.split("/").pop() as string,
          currentPage: "1",
        })
      );
    }
  }, [params?.slug]);

  return (
    <div className="flex flex-col gap-2">
      <Divider style={{ marginTop: 0 }} orientation="center">
        Truyện cùng thể loại
      </Divider>
      <div className="flex flex-col gap-4">
        {items?.map((item: any, index: number) => (
          <Link
            href={`/thong-tin-truyen/${item?.slug}`}
            key={index}
            className="flex gap-2"
          >
            <figure className="w-24 h-32 rounded-md overflow-hidden border border-gray-200">
              <img
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${item?.thumb_url}`}
                alt={item?.name}
              />
            </figure>
            <div className="flex flex-col gap-1 flex-1">
              <span>{item?.name}</span>
              <span className="text-slate-500">
                Cập nhật {formatDate(item?.updatedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComicSuggesion;
