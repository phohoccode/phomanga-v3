"use client";

import ComicList from "@/components/ComicList";
import ComicTitle from "@/components/ComicTitle";
import EmptyData from "@/components/common/EmptyData";
import { isPositiveInteger } from "@/lib/utils";
import { fetchSearchComic } from "@/store/asyncThunk/comic";
import { AppDispatch, RootState } from "@/store/store";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, titlePage, params } = useSelector(
    (state: RootState) => state.comic.searchComic
  );
  const isLoading = useSelector((state: RootState) => state.comic.isLoading);
  const keyword = searchParams.get("keyword") ?? "abc";
  const currentPage = isPositiveInteger(searchParams.get("page") as string)
    ? searchParams.get("page")
    : "1";
  const totalItems = params?.pagination?.totalItems;
  const itemsPerPage = params?.pagination?.totalItemsPerPage;

  useEffect(() => {
    dispatch(
      fetchSearchComic({
        keyword: keyword as string,
        currentPage: currentPage as string,
      })
    );
  }, [currentPage, keyword]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("keyword", keyword as string);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (items.length === 0 && !isLoading) {
    return <EmptyData description="Không tìm thấy truyện phù hợp!" />;
  }

  return (
    <div className="p-6 flex flex-col">
      <ComicTitle title={titlePage} orientation="center" loading={isLoading} />
      <ComicList data={items} loading={isLoading} title={titlePage} />
      <Pagination
        style={{ marginTop: "48px" }}
        align="center"
        onChange={handleChangePage}
        showTitle={true}
        showSizeChanger={false}
        current={Number(currentPage)}
        total={totalItems}
        pageSize={itemsPerPage}
      />
    </div>
  );
};

export default Page;
