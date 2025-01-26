"use client";

import { setSort } from "@/store/slices/commentSlice";
import { AppDispatch } from "@/store/store";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const CommentFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";
  const router = useRouter();

  const handleChangeSort = (sort: "asc" | "desc") => {
    const url = new URLSearchParams(searchParams.toString());

    url.delete("sort");
    url.set("sort", sort);
    router.push(`${params?.slug}?${url.toString()}`);

    dispatch(setSort(sort));
  };

  return (
    <>
      {sort === "asc" ? (
        <Button
          onClick={() => handleChangeSort("desc")}
          size="small"
          type="text"
          icon={<SortDescendingOutlined />}
        >
          Gần đây
        </Button>
      ) : (
        <Button
          onClick={() => handleChangeSort("asc")}
          size="small"
          type="text"
          icon={<SortAscendingOutlined />}
        >
          Cũ nhất
        </Button>
      )}
    </>
  );
};

export default CommentFilter;
