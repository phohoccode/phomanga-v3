import { formatDate } from "@/lib/utils";
import { Tag, Typography } from "antd";
import Link from "next/link";

const SlideItem = ({ slide }: any) => {
  return (
    <div className="relative h-[420px]">
      <Link href={`/thong-tin-truyen/${slide?.slug}`} className="relative">
        <img
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${slide?.thumb_url}`}
          alt={slide?.slug}
        />
      </Link>
      <div className="absolute bottom-[10px] left-[10px] right-[10px] rounded-xl  bg-[#13c2c2]">
        <Typography.Text className="font-semibold truncate">{slide?.name}</Typography.Text>
      </div>
      <div className="absolute top-[10px] right-[10px]">
        <Tag color="blue">{formatDate(slide?.updatedAt)}</Tag>
      </div>
    </div>
  );
};

export default SlideItem;
