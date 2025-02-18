"use client";

import { RootState } from "@/store/store";
import { CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useSelector } from "react-redux";

interface ChapterItemProps {
  data: any;
  slug: string;
  viewedChapterBySlug: any[];
}

const ChapterItem = ({ data, slug, viewedChapterBySlug }: ChapterItemProps) => {
  const id = data?.chapter_api_data?.split("/").pop();
  const { width } = useSelector((state: RootState) => state.system);

  return (
    <Link
      className={`flex gap-2 items-center w-full rounded-md hover:bg-gray-100 p-2 
        ${
          viewedChapterBySlug.includes(id)
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
  );
};

export default ChapterItem;
