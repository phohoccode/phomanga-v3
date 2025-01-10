"use client";

import ComicList from "@/components/ComicList";
import ComicTitle from "@/components/ComicTitle";
import { isPositiveInteger } from "@/lib/utils";
import { fetchComicDetail } from "@/store/asyncThunk/comic";
import { AppDispatch, RootState } from "@/store/store";
import { Pagination } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const _params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, titlePage, params } = useSelector(
    (state: RootState) => state.comic.comicDetail
  );
  const isLoading = useSelector((state: RootState) => state.comic.isLoading);
  const currentPage = isPositiveInteger(searchParams.get("page") as string)
    ? searchParams.get("page")
    : "1";
  const totalItems = params?.pagination?.totalItems;
  const itemsPerPage = params?.pagination?.totalItemsPerPage;

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
