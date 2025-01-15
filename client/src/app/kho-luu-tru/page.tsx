"use client";

import ComicList from "@/components/ComicList";
import EmptyData from "@/components/common/EmptyData";
import Layout from "@/components/layout/Layout";
import { getAllSavedComic } from "@/store/asyncThunk/userAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Alert, Breadcrumb, Divider, Skeleton } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { title } from "process";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading } = useSelector(
    (state: RootState) => state.user.savedComics
  );
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const breakCrumbs = [
    { title: <Link href="/">Trang chủ</Link> },
    { title: "Kho lưu trữ" },
  ];

  useEffect(() => {
    const getDataSavedComic = async () => {
      if (session?.user?.id) {
        setIsLoading(true);
        await dispatch(
          getAllSavedComic({
            userId: session?.user?.id,
          })
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    };

    getDataSavedComic();
  }, [session?.user?.id]);

  if (items?.length === 0 && !loading) {
    return <EmptyData description="Kho lưu trữ trống" />;
  }

  return (
    <Layout>
      <Breadcrumb items={breakCrumbs} />

      <Divider orientation="center">Kho lưu trữ</Divider>
      <Alert
        message="Chú ý: kho lưu trữ hiện tại của bạn chỉ lưu trữ tối đa 10 truyện. Nâng cấp tài khoản để lưu trữ nhiều hơn!"
        style={{ margin: "32px 0" }}
      />
      <ComicList data={items} loading={isLoading} />
    </Layout>
  );
};

export default Page;
