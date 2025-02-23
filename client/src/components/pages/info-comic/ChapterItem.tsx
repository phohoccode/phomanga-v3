"use client";

import { RootState } from "@/store/store";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";

interface ChapterItemProps {
  data: any;
  slug: string;
  viewedChapterBySlug: any[];
}

const ChapterItem = ({ data, slug, viewedChapterBySlug }: ChapterItemProps) => {
  const id = data?.chapter_api_data?.split("/").pop();
  const isViewed = viewedChapterBySlug.includes(id);
  const { width } = useSelector((state: RootState) => state.system);

  const content = isViewed ? (
    <span className="text-gray-700 text-sm truncate">Đã xem</span>
  ) : null;

  return (
    <Popover content={content}>
      <Link
        className={`flex gap-2 items-center w-full rounded-md hover:bg-gray-100 p-2 
          ${
            isViewed
              ? "text-[#13c2c2] hover:text-[#13c2c2] "
              : "text-gray-900 hover:text-gray-800"
          }  
        `}
        href={`/dang-xem/${slug}/${id}`}
      >
        <span className="text-inherit flex-1">Chương {data?.chapter_name}</span>
        {viewedChapterBySlug.includes(id) && width > 576 && (
          <CheckCircleOutlined />
        )}
      </Link>
    </Popover>
  );
};

export default ChapterItem;
