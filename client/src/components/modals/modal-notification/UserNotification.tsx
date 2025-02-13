"use client";

import EmptyData from "@/components/common/EmptyData";
import PaginationCT from "@/components/PaginationCT";
import SkeletonNotifycation from "@/components/skeleton/SkeletonNotifycation";
import useGetQuery from "@/hooks/useGetQuery";
import { socket } from "@/lib/socket";
import { formatDate } from "@/lib/utils";
import {
  deleteNotification,
  fetchAllNotifications,
} from "@/store/asyncThunk/notificationAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Tooltip } from "antd";

const UserNotification = () => {
  const { user, loading } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion } = useSession();
  const [loadingId, setLoadingId] = useState("");
  const currentPage = useGetQuery("page-user", "1", "number");
  const notifyRef = useRef<any>(null);

  useEffect(() => {
    handleGetAllNotify();
  }, [currentPage]);

  useEffect(() => {
    notifyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    socket.on("refreshNotifications", (res) => {
      if (res?.type === "user") {
        handleGetAllNotify();
      }
    });

    return () => {
      socket.off("refreshNotifications");
    };
  }, []);

  const handleGetAllNotify = () => {
    dispatch(
      fetchAllNotifications({
        type: "user",
        userId: sesstion?.user?.id,
        limit: 10,
        page: currentPage,
      })
    );
  };

  const handleDeleteNotify = async (id: string) => {
    setLoadingId(id);
    const response: any = await dispatch(
      deleteNotification({
        notificationId: id,
        userId: sesstion?.user?.id as string,
      })
    );
    setLoadingId("");

    if (response.payload?.status === "success") {
      handleGetAllNotify();
    }
  };

  if (loading) {
    return <SkeletonNotifycation />;
  }

  if (user?.items?.length === 0 && !loading) {
    return <EmptyData description="Yên tĩnh ghê! Không có thông báo nào!" />;
  }

  return (
    <>
      <ul className="flex flex-col max-h-[50vh] overflow-y-auto pr-2">
        {user?.items?.map((item, index: number) => (
          <li key={index}>
            <div
              className="flex gap-2 justify-between"
              key={index}
              ref={notifyRef}
            >
              <div className="flex flex-col gap-1 flex-1">
                <span className="flex-1 text-base text-slate-700 ">
                  {item?.content}
                </span>
                <span className="text-xs text-gray-600">
                  <ClockCircleOutlined />{" "}
                  <span className="ml-1">{formatDate(item?.created_at)}</span>
                </span>
              </div>
              <Tooltip title="Xoá thông báo" style={{ width: "10%" }}>
                <Button
                  loading={loadingId === item.id}
                  onClick={() => handleDeleteNotify(item.id)}
                  size="small"
                  icon={<CloseOutlined />}
                  variant="text"
                  color="default"
                />
              </Tooltip>
            </div>

            <Divider style={{ margin: "12px 0" }} />
          </li>
        ))}
      </ul>

      {user?.totalItem > 10 && (
        <PaginationCT
          titleSearch="page-user"
          total={user?.totalItem}
          pageSize={10}
          currentPage={currentPage as string}
        />
      )}
    </>
  );
};

export default UserNotification;
