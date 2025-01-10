import { formatDate } from "@/lib/utils";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import Link from "next/link";

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
      <Tag
        bordered={true}
        color="blue"
        className="absolute top-[4px] right-[4px] mr-0 rounded-lg"
      >
        {formatDate(slide?.updatedAt) ?? "Không xác định"}
      </Tag>
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
