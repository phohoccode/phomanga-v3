import { Alert, Breadcrumb, Divider, Empty } from "antd";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchDataSavedComics } from "@/lib/actions";
import { Suspense } from "react";
import Layout from "@/components/layout/Layout";
import ComicList from "@/components/comic/ComicList";
import Loading from "./loading";
import PaginationCT from "@/components/PaginationCT";

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
    "GET_ALL_VIEWED_COMIC"
  );
  const items = response?.data?.items;
  const totalItems = response?.data?.totalItems;
  const breakCrumbs = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Lịch sử đã xem" },
  ];

  return (
    <Layout>
      <Breadcrumb items={breakCrumbs} />

      <Divider orientation="center">Lịch sử đã xem</Divider>

      {items?.length === 0 && <Empty description="Lịch sữ xem đang trống" />}

      <Suspense key={page} fallback={<Loading />}>
        <ComicList data={items} />
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
