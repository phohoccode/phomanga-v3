import { EyeOutlined } from "@ant-design/icons";
import { Button, Tag, Typography } from "antd";
import Link from "next/link";
import ComicIcon from "./icons/ComicIcon";

const ComicItem = ({ data }: any) => {
  return (
    <div className="relative group overflow-hidden w-full">
      <Link href={`/thong-tin-truyen/${data?.slug}`} className="relative block">
        <figure className="relative h-[240px] block rounded-lg overflow-hidden border border-[#f2f2f2]">
          <img
            className="w-full h-full transition-all group-hover:scale-110 group-hover:brightness-50 object-cover block"
            loading="lazy"
            src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${data?.thumb_url}`}
            alt={data?.slug}
          />
        </figure>
        <Typography.Text className="block p-2 font-semibold truncate group-hover:text-[#13c2c2] transition-all">
          {data?.name ?? "Không xác định"}
        </Typography.Text>
      </Link>
      <div className="absolute top-1 left-1">
        <Tag
          icon={<ComicIcon />}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
          bordered={true}
          color="magenta"
          className="mr-0 text-center truncate"
        >
          Chương {data?.chaptersLatest?.[0]?.chapter_name ?? "lỗi"}
        </Tag>
      </div>
      <div className="absolute top-[100%] flex justify-center left-[12px] right-[12px] opacity-0 group-hover:opacity-100 rounded-xl transition-all group-hover:top-[70%]">
        <Link href={`/dang-doc/${data?.slug}/${data?._id}`} className="w-full">
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
  );
};

export default ComicItem;
