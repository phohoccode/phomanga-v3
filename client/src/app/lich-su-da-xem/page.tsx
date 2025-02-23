import { Breadcrumb, Divider } from "antd";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchDataComic } from "@/lib/actions/user";
import { Suspense } from "react";
import Layout from "@/components/layout/Layout";
import ComicList from "@/components/comic/ComicList";
import Loading from "./loading";
import PaginationCT from "@/components/PaginationCT";
import ButtonDeleteAllComic from "@/components/common/ButtonDeleteAllComic";
import ButtonPauseSavingHistory from "@/components/pages/viewed-comic/ButtonPauseSavingHistory";
import { FieldTimeOutlined } from "@ant-design/icons";

const Page = async ({ searchParams }: any) => {
  const session = await auth();
  const params = await searchParams;
  const page = params?.page || 1;
  const pageSize = 24;
  const response = await fetchDataComic(
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

      <Divider orientation="center">
        <FieldTimeOutlined className="mr-2" />
        Lịch sử đã xem
      </Divider>

      <div className="flex gap-2 justify-end my-8 flex-wrap">
        <ButtonPauseSavingHistory />
        {items?.length > 0 && <ButtonDeleteAllComic type="VIEWED_COMIC" />}
      </div>

      <Suspense key={page} fallback={<Loading />}>
        <ComicList
          data={items}
          description="Lịch sử xem vắng hơn tiệm net lúc cúp điện! ⚡"
        />
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
