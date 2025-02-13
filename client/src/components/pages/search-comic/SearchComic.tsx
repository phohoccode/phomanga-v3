"use client";

import ComicList from "@/components/comic/ComicList";
import ComicTitle from "@/components/comic/ComicTitle";
import EmptyData from "@/components/common/EmptyData";
import Layout from "@/components/layout/Layout";
import useGetQuery from "@/hooks/useGetQuery";
import { fetchSearchComic } from "@/store/asyncThunk/comicAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Pagination, Skeleton } from "antd";

const SearchComic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, titlePage, params, loading } = useSelector(
    (state: RootState) => state.comic.searchComic
  );
  const breadCrumb = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Tìm kiếm" },
    { title: titlePage },
  ];
  const keyword = searchParams.get("keyword") ?? "abc";
  const currentPage = useGetQuery("page", "1", "number");
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

  if (items.length === 0 && !loading) {
    return (
      <EmptyData description="Có vẻ như truyện bạn tìm chưa xuất hiện... thử một truyện khác xem sao!" />
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        {loading ? (
          <Skeleton.Input size="small" style={{ width: "260px" }} />
        ) : (
          <Breadcrumb items={breadCrumb} />
        )}

        <ComicTitle title={titlePage} orientation="center" loading={loading} />

        <ComicList data={items} loading={loading} />

        {items?.length >= 24 && (
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
        )}
      </div>
    </Layout>
  );
};

export default SearchComic;
