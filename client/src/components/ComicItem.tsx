import { EyeOutlined } from "@ant-design/icons";
import { Badge, Button, Typography } from "antd";
import Link from "next/link";

const ComicItem = ({ data }: any) => {
  return (
    <Badge.Ribbon
      placement="start"
      color={data?.chaptersLatest ? "cyan" : "red"}
      text={
        data?.chaptersLatest
          ? `Chương ${data?.chaptersLatest?.[0]?.chapter_name}`
          : "Truyện đang lỗi"
      }
    >
      <div className="relative group overflow-hidden w-full">
        <Link
          href={`/thong-tin-truyen/${data?.slug}`}
          className="relative block"
        >
          <figure className="relative xl:h-[260px] 2xl:h-[240px] h-[260px] block rounded-lg overflow-hidden border border-[#f2f2f2]">
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/error-img.png";
              }}
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
        {data?.chaptersLatest && (
          <div className="absolute top-[100%] flex justify-center left-[12px] right-[12px] opacity-0 group-hover:opacity-100 rounded-xl transition-all group-hover:top-[70%]">
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
