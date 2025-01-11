import { Button, Image, Tag, Tooltip } from "antd";
import ButtonLink from "../common/ButtonLink";
import { BookOutlined, EyeOutlined } from "@ant-design/icons";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { formatDate, removeHTMLTags } from "@/lib/utils";
import Link from "next/link";

export const SessionInfo = ({ data }: any) => {
  const authors = data?.author?.map((item: any) => item);
  const categories = data?.category?.map((item: any) => {
    return (
      <Link key={item?.id} href={`/chi-tiet/the-loai/${item?.slug}`}>
        <Tag color="purple"> {item?.name ?? "Không xác định"}</Tag>
      </Link>
    );
  });

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tác giả",
      children: authors?.[0] === "" ? "Không xác định" : authors,
    },
    {
      key: "2",
      label: "Thời gian cập nhật",
      children: formatDate(data?.updatedAt),
    },
    {
      key: "3",
      label: "Thể loại",
      children: <div className="flex gap-1 flex-wrap">{categories}</div>,
    },
    {
      key: "4",
      label: "Nội dung truyện",
      children: removeHTMLTags(data?.content ?? ""),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col items-center lg:items-start gap-4">
        <Image
          style={{ borderRadius: "8px", border: "1px solid #f0f0f0" }}
          src={`${process.env.NEXT_PUBLIC_OTRUYEN_URL_IMAGE}/${data?.thumb_url}`}
          alt={data?.name ?? "Không xác định"}
          width={200}
          height={260}
        />
        <div className="flex gap-2 w-full justify-center">
          <ButtonLink
            href={`/dang-doc/${data?.slug}/${
              data?.chapters?.[0]?.server_data?.[0]?.chapter_api_data
                ?.split("/")
                .pop() ?? ""
            }?chuong=${
              data?.chapters?.[0]?.server_data?.[0]?.chapter_name ?? ""
            }`}
            text="Đọc truyện"
            showIcon={true}
            icon={<EyeOutlined />}
          />
          <Tooltip placement="top" title="Lưu truyện">
            <Button icon={<BookOutlined />} variant="filled" color="primary" />
          </Tooltip>
        </div>
      </div>

      <Descriptions title={data?.name} items={items} />
    </div>
  );
};
