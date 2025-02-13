"use client";

import useGetQuery from "@/hooks/useGetQuery";
import { setSort } from "@/store/slices/commentSlice";
import { AppDispatch } from "@/store/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

const CommentFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  const sort = useGetQuery("sort", "desc", "string", "asc");
  const router = useRouter();

  const handleChangeSort = (sort: "asc" | "desc") => {
    const urlSearch = new URLSearchParams(searchParams.toString());
    let patname = window.location.pathname;

    urlSearch.delete("sort");
    urlSearch.set("sort", sort);

    patname = patname.startsWith("/thong-tin-truyen")
      ? "/thong-tin-truyen"
      : "/dang-xem";

    if (params?.slug && params?.id) {
      router.push(
        `${patname}/${params?.slug}/${params?.id}?${urlSearch.toString()}`
      );
    } else {
      router.push(`${patname}/${params?.slug}?${urlSearch.toString()}`);
    }

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
