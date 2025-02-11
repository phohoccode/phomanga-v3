"use client";

import ComicList from "@/components/comic/ComicList";
import ComicTitle from "@/components/comic/ComicTitle";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { isPositiveInteger } from "@/lib/utils";
import { fetchComicDetail } from "@/store/asyncThunk/comicAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Breadcrumb, Pagination, Skeleton } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetQuery from "@/hooks/useGetQuery";

const DeltailComic = () => {
  const _params = useParams();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { items, titlePage, params, breadCrumb, loading } = useSelector(
    (state: RootState) => state.comic.comicDetail
  );
  const searchParams = useSearchParams();
  const currentPage = useGetQuery("page", "1", "number");
  const totalItems = params?.pagination?.totalItems;
  const itemsPerPage = params?.pagination?.totalItemsPerPage;
  const breadcrumbItems = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Danh sách truyện tranh" },
    { title: breadCrumb?.[0]?.name ?? "Không xác định" },
    { title: `Trang ${currentPage}` },
  ];

  useEffect(() => {
    dispatch(
      fetchComicDetail({
        description: _params["mo-ta"] as string,
        slug: _params["slug"] as string,
        currentPage: currentPage as string,
      })
    );
  }, [_params["mo-ta"], _params["slug"], currentPage]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        {loading ? (
          <Skeleton.Input size="small" style={{ width: "40%" }} />
        ) : (
          <Breadcrumb items={breadcrumbItems} />
        )}

        <ComicTitle title={titlePage} orientation="center" loading={loading} />

        <ComicList data={items} loading={loading} />

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
    </Layout>
  );
};

export default DeltailComic;
