"use client";

import Search from "antd/es/input/Search";
import RootModal from "./RootModal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setShowModalSearch } from "@/store/slices/systemSlice";
import { message } from "antd";

const ModalSearch = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onSearch = async (value: string) => {
    if (value?.trim() === "") {
      message.info("Bạn mmuốn tìm kiếm gì?");
      return;
    }
    router.push(`/tim-kiem?keyword=${value}&page=1`);
    dispatch(setShowModalSearch(false));
  };

  return (
    <RootModal
      title={
        <Search
          ref={(el) => {
            setTimeout(() => el?.focus(), 0);
          }}
          allowClear
          placeholder="Tìm kiếm truyện tranh ..."
          onSearch={onSearch}
          style={{ width: "100%" }}
        />
      }
      isModalOpen={isModalOpen}
      onCancel={onCancel}
      closeIcon={null}
    >
      <div>Search</div>
    </RootModal>
  );
};

export default ModalSearch;
