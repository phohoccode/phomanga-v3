import { Alert, Breadcrumb, Divider, Empty } from "antd";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchDataSavedComics } from "@/lib/actions";
import { Suspense } from "react";
import Layout from "@/components/layout/Layout";
import ComicList from "@/components/comic/ComicList";
import Loading from "./loading";
import PaginationCT from "@/components/PaginationCT";
import ButtonDeleteAllComic from "@/components/ButtonDeleteAllComic";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await auth();
  const params = await searchParams;
  const page = params?.page || 1;
  const pageSize = 24;
  const response = await fetchDataSavedComics(
    session?.user?.id as string,
    page,
    "GET_ALL_SAVED_COMIC"
  );
  const items = response?.data?.items;
  const totalItems = response?.data?.totalItems;
  const breakCrumbs = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Kho lưu trữ" },
  ];

  return (
    <Layout>
      <Breadcrumb items={breakCrumbs} />

      <Divider orientation="center">Kho lưu trữ</Divider>

      {items?.length > 0 && (
        <div className="flex justify-end my-8">
          <ButtonDeleteAllComic type="SAVED_COMIC" />
        </div>
      )}

      <Alert
        type="info"
        showIcon={true}
        message="Tài khoản hiện tại của bạn lưu được tối đa 24 truyện. Nâng cấp tài khoản để lưu nhiều hơn."
        style={{ margin: "32px 0" }}
        closeIcon
      />

      <Suspense key={page} fallback={<Loading />}>
        <ComicList data={items} description="Kho lưu trữ của bạn đang trống" />
        {totalItems > pageSize && (
          <PaginationCT
            total={totalItems}
            pageSize={pageSize}
            currentPage={page}
          />
        )}
      </Suspense>
    </Layout>
  );
};

export default Page;
