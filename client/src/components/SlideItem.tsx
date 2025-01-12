import { Button, Typography } from "antd";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";

const SlideItem = ({ slide }: any) => {
  return (
    <div className="relative h-[360px] group">
      <Link href={`/thong-tin-truyen/${slide?.slug}`} className="relative">
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/error-img.png";
          }}
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${slide?.thumb_url}`}
          alt={slide?.slug ?? "Không xác định"}
        />
      </Link>
      <div className="absolute top-[100%] flex flex-col justify-center left-[12px] right-[12px] opacity-0 group-hover:opacity-100 rounded-xl transition-all group-hover:top-[77%]">
        <Typography.Text className="font-bold block mb-2 truncate text-gray-50 transition-all">
          {slide?.name ?? "Không xác định"}
        </Typography.Text>
        <Link
          href={`/dang-xem/${slide?.slug}/${
            slide?.chaptersLatest?.[0]?.chapter_api_data?.split("/").pop() ??
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
            Xem ngay
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SlideItem;
