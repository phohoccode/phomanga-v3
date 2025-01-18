"use client";

import type { ComicItem } from "@/lib/types";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Badge, Button, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ComicItem = ({ data, onClickDelete, loading }: ComicItem) => {
  const [textRibbon, setTextRibbon] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (data) {
      const chapterName =
        data?.chaptersLatest?.[0]?.chapter_name ?? data?.chapter_name;
      const chapterId =
        data?.chaptersLatest?.[0]?.chapter_api_data?.split("/").pop() ??
        data?.id ??
        "?status=comic-error";

      setTextRibbon(chapterName ? `Chương ${chapterName}` : "Lỗi");
      setLink(`/dang-xem/${data?.slug}/${chapterId}`);
    }
  }, [pathname, data]);

  const handleDeleteComic = async (slug?: string, id?: string) => {
    if (onClickDelete) {
      onClickDelete(slug, id);
    }
  };

  return (
    <Badge.Ribbon
      placement="start"
      color={
        data?.chaptersLatest || data?.chapters || data?.chapter_name
          ? "cyan"
          : "red"
      }
      text={textRibbon}
    >
      <div className="relative group overflow-hidden w-full">
        <Link
          href={`/thong-tin-truyen/${data?.slug}`}
          className="relative block"
        >
          <figure className="relative xl:h-[260px] 2xl:h-[240px] h-[260px] block rounded-lg overflow-hidden border border-[#f2f2f2]">
            <img
              className="w-full h-full transition-all group-hover:scale-110 group-hover:brightness-50 object-cover block"
              loading="lazy"
              src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${data?.thumb_url}`}
              alt={data?.slug ?? "Không xác định"}
            />
          </figure>
          <Typography.Text className="block p-2 font-semibold truncate group-hover:text-[#13c2c2] transition-all">
            {data?.name ?? data?.comic_name ?? "Không xác định"}
          </Typography.Text>
        </Link>

        {/* Hiển thị khi ở /kho-luu-tru hoặc /lich-su-da-xem */}

        {(pathname === "/kho-luu-tru" || pathname === "/lich-su-da-xem") && (
          <div className="absolute top-2 right-2">
            <Button
              loading={loading}
              onClick={() => handleDeleteComic(data?.slug, data?.id)}
              icon={<DeleteOutlined />}
              color="red"
              variant="solid"
            />
          </div>
        )}

        <div className="absolute top-[100%] flex justify-center gap-2 left-[12px] right-[12px] opacity-0 group-hover:opacity-100 rounded-xl transition-all group-hover:top-[70%]">
          <Link href={link} className="w-full">
            <Button
              className="w-full"
              type="link"
              color="cyan"
              variant="solid"
              icon={<EyeOutlined />}
            >
              Đọc ngay
            </Button>
          </Link>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default ComicItem;
