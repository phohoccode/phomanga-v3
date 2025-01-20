"use client";

import { formatDate, randomItemFromArray } from "@/lib/utils";
import { fetchComicDetail } from "@/store/asyncThunk/comicAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Divider } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// load 2 lần do loading ở trang thông tin truyện

const ComicSuggesion = () => {
  const { data: session } = useSession();
  const catetorys = useSelector((state: RootState) => state.comic.catetorys);
  const { items } = useSelector((state: RootState) => state.comic.comicDetail);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    handleGenarateComicSuggestions();
  }, [params?.slug, session?.user?.id]);

  const handleGenarateComicSuggestions = () => {
    if (catetorys?.length > 0) {
      const itemRandom = randomItemFromArray(catetorys);
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
        {items.slice(0, 12)?.map((item: any, index: number) => (
          <Link
            href={`/thong-tin-truyen/${item?.slug}`}
            key={index}
            className="flex gap-2 group"
          >
            <figure className="w-24 h-32 rounded-md overflow-hidden border border-gray-200">
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/error-img.png";
                }}
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${item?.thumb_url}`}
                alt={item?.name}
              />
            </figure>
            <div className="flex flex-col gap-1 flex-1">
              <span>{item?.name ?? "Không xác định"}</span>
              <span className="text-xs">
                {item?.chaptersLatest?.[0]?.chapter_name
                  ? `Chương mới nhất ${item?.chaptersLatest?.[0]?.chapter_name}`
                  : "Truyện đang lỗi"}
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
