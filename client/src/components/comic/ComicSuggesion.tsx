"use client";

import { formatDate } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Divider } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
import EmptyData from "../common/EmptyData";

const ComicSuggesion = ({ title }: { title: string }) => {
  const { items } = useSelector((state: RootState) => state.comic.comicDetail);

  return (
    <div className="flex flex-col gap-2">
      <Divider style={{ marginTop: 0 }} orientation="center">
        {title ?? "Gợi ý"}
      </Divider>

      {items?.length === 0 && <EmptyData description="Gợi ý đang lỗi" />}

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
