"use client";

import EmptyData from "@/components/common/EmptyData";
import PaginationCT from "@/components/PaginationCT";
import SkeletonNotifycation from "@/components/skeleton/SkeletonNotifycation";
import { socket } from "@/lib/socket";
import { formatDate, isPositiveInteger } from "@/lib/utils";
import { fetchAllNotifications } from "@/store/asyncThunk/notificationAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { CheckCircleFilled } from "@ant-design/icons";
import { Divider } from "antd";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const SystemNotification = () => {
  const { system, loading } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion } = useSession();
  const searchParams = useSearchParams();
  const currentPage = isPositiveInteger(
    searchParams.get("page-system") as string
  )
    ? searchParams.get("page-system")
    : "1";
  const notifyRef = useRef<any>(null);

  const handleFetchAllNotifications = () => {
    dispatch(
      fetchAllNotifications({
        type: "system",
        userId: sesstion?.user?.id,
        limit: 10,
        page: currentPage,
      })
    );
  };

  useEffect(() => {
    handleFetchAllNotifications();
  }, [currentPage]);

  useEffect(() => {
    notifyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    socket.on("refreshNotifications", (res) => {
      if (res?.type === "system") {
        handleFetchAllNotifications();
      }
    });

    return () => {
      socket.off("refreshNotifications");
    };
  }, []);

  if (loading) {
    return <SkeletonNotifycation />;
  }

  if (system?.items?.length === 0 && !loading) {
    return <EmptyData description="Không có thông báo nào tại đây" />;
  }

  return (
    <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
      <ul className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-2">
        {system?.items?.map((item, index: number) => (
          <li key={index} ref={notifyRef}>
            <h3 className="lg:text-lg text-base font-semibold truncate">
              <span className="text-[#13c2c2] mr-2">#</span>
              {item.title}
            </h3>
            <p className="lg:text-base text-sm mt-1">{item.content}</p>
            <div className="flex gap-2 items-center mt-2 text-sm">
              <span className="text-xs">
                Đăng bởi{" "}
                <span className="text-[#13c2c2] break-words text-xs">
                  <a href="#">
                    {"Admin"} <CheckCircleFilled />
                  </a>
                </span>
              </span>
              ·<span>{formatDate(item?.created_at)}</span>
            </div>
            <Divider style={{ margin: "12px 0" }} />
          </li>
        ))}
      </ul>

      {system?.totalItem > 10 && (
        <PaginationCT
          titleSearch="page-system"
          total={system?.totalItem}
          pageSize={10}
          currentPage={currentPage as string}
        />
      )}
    </Suspense>
  );
};

export default SystemNotification;
