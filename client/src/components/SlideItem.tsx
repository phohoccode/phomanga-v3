import { formatDate } from "@/lib/utils";
import { Tag } from "antd";
import Link from "next/link";
import ComicIcon from "./icons/ComicIcon";

const SlideItem = ({ slide }: any) => {
  return (
    <div className="relative h-[360px]">
      <Link href={`/thong-tin-truyen/${slide?.slug}`} className="relative">
        <img
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${slide?.thumb_url}`}
          alt={slide?.slug}
        />
      </Link>
      <div className="absolute top-1 right-1 flex flex-col gap-2">
        <Tag
          bordered={true}
          color="blue"
          className=" rounded-lg mr-0 text-center"
        >
          {formatDate(slide?.updatedAt) ?? "Không xác định"}
        </Tag>
        {slide?.chaptersLatest[0]?.chapter_name && (
          <Tag
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
            icon={<ComicIcon />}
            bordered={true}
            color="magenta"
            className=" rounded-lg mr-0 text-center"
          >
            Chương {slide?.chaptersLatest[0]?.chapter_name}
          </Tag>
        )}
      </div>
      <Tag
        style={{ marginRight: "0px" }}
        color="magenta"
        className="absolute bottom-[10px] rounded-xl text-base left-[10px] right-[10px] truncate text-center"
      >
        {slide?.name ?? "Không xác định"}
      </Tag>
    </div>
  );
};

export default SlideItem;
