"use client";

import EmptyData from "@/components/common/EmptyData";
import PaginationCT from "@/components/PaginationCT";
import SkeletonNotifycation from "@/components/skeleton/SkeletonNotifycation";
import useGetQuery from "@/hooks/useGetQuery";
import { socket } from "@/lib/socket";
import { formatDate } from "@/lib/utils";
import { fetchAllNotifications } from "@/store/asyncThunk/notificationAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleFilled } from "@ant-design/icons";
import { Divider } from "antd";

const SystemNotification = () => {
  const { system, loading } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion } = useSession();
  const currentPage = useGetQuery("system-notification-page", "1", "number");
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
    socket.on("refresh-notifications", (res) => {
      if (res?.type === "system") {
        handleFetchAllNotifications();
      }
    });

    return () => {
      socket.off("refresh-notifications");
    };
  }, []);

  if (loading) {
    return <SkeletonNotifycation />;
  }

  if (system?.items?.length === 0 && !loading) {
    return (
      <EmptyData description="Thông báo đang ngủ đông! 💤 Thử quay lại sau nhé!" />
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-2">
        {system?.items?.map((item, index: number) => (
          <li key={index} ref={notifyRef}>
            <h3 className="lg:text-base text-sm font-semibold truncate">
              <span className="text-[#13c2c2] mr-2"># {item?.title}</span>
            </h3>
            <p className="lg:text-base text-sm">{item.content}</p>
            <div className="flex gap-2 justify-between items-center mt-2 text-sm">
              <span className="text-xs">
                Đăng bởi
                <span className="text-[#13c2c2] break-words text-xs italic ml-2">
                  {"Admin"} <CheckCircleFilled />
                </span>
              </span>
              <span className="text-xs text-gray-600">
                {formatDate(item?.created_at)}
              </span>
            </div>
            <Divider style={{ margin: "12px 0" }} />
          </li>
        ))}
      </ul>

      {system?.totalItem > 10 && (
        <PaginationCT
          titleSearch="system-notification-page"
          total={system?.totalItem}
          pageSize={10}
          currentPage={currentPage as string}
        />
      )}
    </>
  );
};

export default SystemNotification;
