"use client";

import { formatDate, randomItemFromArray } from "@/lib/utils";
import { fetchComicDetail } from "@/store/asyncThunk/comic";
import { AppDispatch, RootState } from "@/store/store";
import { Divider } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// load 2 lần do loading ở trang thông tin truyện

const ComicSuggesion = () => {
  const catetorys = useSelector((state: RootState) => state.comic.catetorys);
  const { items } = useSelector((state: RootState) => state.comic.comicDetail);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    handleGenarateComicSuggestions();
  }, [params?.slug]);

  const handleGenarateComicSuggestions = () => {
    if (catetorys?.length > 0) {
      const itemRandom = randomItemFromArray(catetorys);
      console.log(itemRandom);
      dispatch(
        fetchComicDetail({
          description: "the-loai",
          slug: itemRandom?.slug,
          currentPage: "1",
        })
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Divider style={{ marginTop: 0 }} orientation="center">
        Gợi ý truyện khác
      </Divider>
      <div className="flex flex-col gap-4">
        {items?.map((item: any, index: number) => (
          <Link
            href={`/thong-tin-truyen/${item?.slug}`}
            key={index}
            className="flex gap-2 group"
          >
            <figure className="w-24 h-32 rounded-md overflow-hidden border border-gray-200">
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/error-image.png";
                }}
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${item?.thumb_url}`}
                alt={item?.name}
              />
            </figure>
            <div className="flex flex-col gap-1 flex-1">
              <span className="group-hover:text-[#13c2c2] transition-all">
                {item?.name ?? "Không xác định"}
              </span>
              <span className="text-slate-500 text-xs">
                Cập nhật {formatDate(item?.updatedAt ?? "lỗi")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComicSuggesion;
