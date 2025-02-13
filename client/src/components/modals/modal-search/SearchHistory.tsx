"use client";

import EmptyData from "@/components/common/EmptyData";
import SkeletonSearchHistory from "@/components/skeleton/SkeletonSearchHistory";
import {
  deleteSearchHistory,
  getSearchHisory,
} from "@/store/asyncThunk/userAsyncThunk";
import { setShowModalSearch } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Tooltip, Typography } from "antd";

const SearchHistory = ({ keyword }: { keyword: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading } = useSelector(
    (state: RootState) => state.user.searchHistory
  );
  const { data: session } = useSession();
  const [loadingId, setLoadingId] = useState("");

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(getSearchHisory({ userId: session?.user?.id as string }));
    }
  }, [session]);

  const handleDeleteSearchHistory = async (searchId: string) => {
    if (session?.user?.id) {
      setLoadingId(searchId);
      await dispatch(
        deleteSearchHistory({
          userId: session?.user?.id as string,
          searchId,
        })
      );

      setLoadingId("");

      await dispatch(getSearchHisory({ userId: session?.user?.id as string }));
    }
  };

  if (keyword?.trim() !== "") return null;

  if (items?.length === 0 && !loading) {
    return (
      <EmptyData description="Không có gì để xem lại… Chắc bạn vừa dọn dẹp ký ức? 🧹" />
    );
  }

  return (
    <div className="flex flex-col">
      <Divider orientation="left">
        <Typography.Text type="secondary">Lịch sử tìm kiếm</Typography.Text>
      </Divider>

      {loading ? (
        <SkeletonSearchHistory />
      ) : (
        <ul className="flex flex-col gap-2">
          {items?.map((item: any, index: number) => (
            <li key={index} className="flex justify-between gap-2 items-center">
              <Link
                onClick={() => dispatch(setShowModalSearch(false))}
                href={`/tim-kiem?keyword=${item?.keyword}&page=1`}
                className="text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-700 p-2 flex-1 max-w-[88%] lg:max-w-[95%] flex items-center gap-2 transition-all"
              >
                <ClockCircleOutlined />
                <span className="w-full truncate">{item?.keyword}</span>
              </Link>
              <Tooltip title="Xoá lịch sử" style={{ width: "10%" }}>
                <Button
                  loading={loadingId === item?.id}
                  onClick={() => handleDeleteSearchHistory(item?.id)}
                  size="small"
                  icon={<CloseOutlined />}
                  variant="text"
                  color="default"
                />
              </Tooltip>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;
