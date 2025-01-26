"use client";

import type { PaginationCT } from "@/lib/types";
import { isPositiveInteger } from "@/lib/utils";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PaginationCT = ({
  total,
  pageSize,
  currentPage,
  titleSearch,
}: PaginationCT) => {
  currentPage = isPositiveInteger(currentPage.toString()) ? currentPage : 1;

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(titleSearch ? titleSearch : "page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
      <Pagination
        style={{ marginTop: "32px" }}
        onChange={(page) => handleChangePage(page)}
        align="center"
        current={Number(currentPage)}
        showSizeChanger={false}
        total={total}
        pageSize={pageSize}
      />
    </Suspense>
  );
};

export default PaginationCT;
