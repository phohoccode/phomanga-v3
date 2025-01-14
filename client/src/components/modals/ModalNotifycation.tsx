"use client";

import { useEffect, useRef, useState } from "react";
import RootModal from "./RootModal";
import { Button, Divider } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import SkeletonNotifycation from "../skeleton/SkeletonNotifycation";
import EmptyData from "../common/EmptyData";

const ModalNotifycation = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const [notifycation, setNotifycation] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const notifyRef = useRef<any>(null);

  
  const fetchNotifycation = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`
      );
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setNotifycation((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Lỗi fetch dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifycation(page);
  }, [page]);

  useEffect(() => {
    notifyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notifycation]);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  return (
    <RootModal
      title="Thông báo hệ thống"
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      {notifycation.length === 0 && !loading && (
        <EmptyData description="Không có thông báo nào tại đây" />
      )}

      {loading && page === 1 ? (
        <SkeletonNotifycation />
      ) : (
        <>
          <ul className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto mt-4 pr-2">
            {notifycation.map((item, index: number) => (
              <li key={index} ref={notifyRef}>
                <h3 className="text-lg font-semibold truncate">
                  <span className="text-[#13c2c2] mr-2">#</span>
                  {item.title}
                </h3>
                <p className="text-base mt-1">{item.title}</p>
                <div className="flex gap-2 items-center mt-2 text-sm">
                  <span>
                    Đăng bởi{" "}
                    <span className="text-[#13c2c2] break-words">
                      <a href="#">
                        phohoccode <CheckCircleFilled />
                      </a>
                    </span>
                  </span>
                  ·<span>3 ngày trước</span>
                </div>
                <Divider style={{ margin: "12px 0" }} />
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-4">
            {hasMore ? (
              <Button
                loading={loading}
                onClick={handleSeeMore}
                type="text"
                size="small"
              >
                {loading ? "Đang tải" : "Xem thêm"}
              </Button>
            ) : (
              <span className="text-gray-400 text-center">
                Không còn thông báo nào
              </span>
            )}
          </div>
        </>
      )}
    </RootModal>
  );
};

export default ModalNotifycation;
