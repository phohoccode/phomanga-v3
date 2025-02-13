"use client";

import { usePathname } from "next/navigation";
import { ReadOutlined, SearchOutlined } from "@ant-design/icons";
import { Divider, Skeleton } from "antd";

const ComicTitle = ({
  title,
  orientation,
  loading,
}: {
  title: string;
  orientation: "left" | "right" | "center";
  loading?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Divider orientation={orientation}>
      {loading ? (
        <Skeleton.Input style={{ width: "100%" }} size="small" />
      ) : (
        <>
          {!pathname.startsWith("/tim-kiem") ? (
            <ReadOutlined className="mr-2" />
          ) : (
            <SearchOutlined className="mr-2" />
          )}
          {title}
        </>
      )}
    </Divider>
  );
};

export default ComicTitle;
