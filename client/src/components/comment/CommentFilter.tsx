"use client";

import useGetQuery from "@/hooks/useGetQuery";
import { setIsScroll, setSort } from "@/store/slices/commentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";

const CommentFilter = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  const sort = useGetQuery("sort", "desc", "string", "asc");
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.comment);

  const handleChangeSort = async (sort: "asc" | "desc") => {
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

    message.info(
      sort === "asc"
        ? "Bình luận đã được sắp xếp cũ nhất"
        : "Bình luận đã được sắp xếp mới nhất"
    );

    dispatch(setSort(sort));
    dispatch(setIsScroll(true));
  };

  return (
    <>
      {sort === "asc" ? (
        <Button
          onClick={() => handleChangeSort("desc")}
          size="small"
          type="text"
          loading={loading}
          icon={<SortDescendingOutlined />}
        >
          Gần đây
        </Button>
      ) : (
        <Button
          onClick={() => handleChangeSort("asc")}
          size="small"
          type="text"
          loading={loading}
          icon={<SortAscendingOutlined />}
        >
          Cũ nhất
        </Button>
      )}
    </>
  );
};

export default CommentFilter;
