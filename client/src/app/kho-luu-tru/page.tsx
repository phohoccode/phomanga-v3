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
import { InboxOutlined } from "@ant-design/icons";
import TitleAlert from "@/components/pages/archive-comic/TitleAlert";

const Page = async ({ searchParams }: any) => {
  const session: any = await auth();
  const params = await searchParams;
  const page = params?.page || 1;
  const pageSize = 24;
  const response = await fetchDataComic(
    session?.user?.id as string,
    page,
    "GET_ALL_SAVED_COMIC"
  );
  const items = response?.data?.items;
  const totalItems = response?.data?.totalItems ?? 0;
  const maxStories = session?.user?.max_stories ?? 0;

  const breakCrumbs = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Kho lưu trữ" },
  ];

  return (
    <Layout>
      <Breadcrumb items={breakCrumbs} />

      <Divider orientation="center">
        <InboxOutlined className="mr-2" />
        <span>
          Kho lưu trữ{" "}
          <span
            className={`${
              totalItems === maxStories && "text-red-500 font-semibold"
            }`}
          >{`(${totalItems}/${maxStories})`}</span>
        </span>
      </Divider>

      {items?.length > 0 && (
        <div className="flex justify-end my-8">
          <ButtonDeleteAllComic type="SAVED_COMIC" />
        </div>
      )}

      <TitleAlert />

      <Suspense key={page} fallback={<Loading />}>
        <ComicList
          data={items}
          description="Không có gì ở đây cả! Đi săn truyện về thôi! 🚀"
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
