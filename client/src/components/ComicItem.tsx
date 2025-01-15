import {
  deleteComic,
  getAllSavedComic,
} from "@/store/asyncThunk/userAsyncThunk";
import { AppDispatch } from "@/store/store";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Badge, Button, Typography } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";

const pathnameShowDeleteButton = ["/kho-luu-tru", "/lich-su-da-xem"];

const ComicItem = ({ data }: any) => {
  const pathname = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();

  const ribbonText = useMemo(() => {
    if (pathname !== "/kho-luu-tru" && pathname !== "/lich-su-da-xem") {
      return data?.chaptersLatest
        ? `Chương ${data?.chaptersLatest?.[0]?.chapter_name}`
        : "Truyện đang lỗi";
    }
    const chapters = data?.chapters?.[0]?.server_data;
    const chapterLatest = chapters?.[chapters?.length - 1];
    return chapterLatest
      ? `Chương ${chapterLatest?.chapter_name}`
      : "Truyện đang lỗi";
  }, [pathname, data]);

  const handleDeleteComic = async () => {
    if (!session?.user?.id || !data?.slug) return;

    if (pathname === "/kho-luu-tru") {
      await dispatch(
        deleteComic({ userId: session?.user?.id, comicSlug: data?.slug })
      );
      await dispatch(getAllSavedComic({ userId: session?.user?.id }));
    }
  };

  const handleImageError = ({ currentTarget }: any) => {
    currentTarget.onerror = null;
    currentTarget.src = "/error-img.png";
  };

  return (
    <Badge.Ribbon
      placement="start"
      color={ribbonText ? "cyan" : "red"}
      text={ribbonText}
    >
      <div className="relative group overflow-hidden w-full">
        <Link
          href={`/thong-tin-truyen/${data?.slug}`}
          className="relative block"
        >
          <figure className="relative xl:h-[260px] 2xl:h-[240px] h-[260px] block rounded-lg overflow-hidden border border-[#f2f2f2]">
            <img
              onError={handleImageError}
              className="w-full h-full transition-all group-hover:scale-110 group-hover:brightness-50 object-cover block"
              loading="lazy"
              src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${data?.thumb_url}`}
              alt={data?.slug ?? "Không xác định"}
            />
          </figure>
          <Typography.Text className="block p-2 font-semibold truncate group-hover:text-[#13c2c2] transition-all">
            {data?.name ?? "Không xác định"}
          </Typography.Text>
        </Link>

        {pathnameShowDeleteButton.includes(pathname) && (
          <div className="absolute top-2 right-2">
            <Button
              onClick={handleDeleteComic}
              color="red"
              variant="solid"
              style={{ flexShrink: 0 }}
              icon={<DeleteOutlined />}
            />
          </div>
        )}

        {ribbonText && (
          <div className="absolute top-[100%] flex justify-center gap-2 left-[12px] right-[12px] opacity-0 group-hover:opacity-100 rounded-xl transition-all group-hover:top-[70%]">
            <Link
              href={`/dang-xem/${data?.slug}/${
                data?.chaptersLatest?.[0]?.chapter_api_data?.split("/").pop() ??
                "?status=404"
              }`}
              className="w-full"
            >
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
        )}
      </div>
    </Badge.Ribbon>
  );
};

export default ComicItem;
