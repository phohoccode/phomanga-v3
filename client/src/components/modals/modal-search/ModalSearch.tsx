"use client";

import Search from "antd/es/input/Search";
import RootModal from "../RootModal";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setShowModalSearch } from "@/store/slices/systemSlice";
import { message, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import SearchPreview from "./SearchPreview";
import {
  fetchSearchComic,
  fetchSearchComicPreview,
} from "@/store/asyncThunk/comic";
import debounce from "debounce";
import SearchRecent from "./SearchRecent";

const ModalSearch = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const handleShowSearchPreview = async () => {
      if (keyword.trim() !== "") {
        await dispatch(
          fetchSearchComicPreview({
            keyword,
          })
        );
      }
    };

    const debouncedSearch = debounce(handleShowSearchPreview, 500);

    debouncedSearch();

    return () => {
      debouncedSearch.clear();
    };
  }, [keyword]);

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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={onSearch}
          style={{ width: "100%" }}
        />
      }
      isModalOpen={isModalOpen}
      onCancel={onCancel}
      closeIcon={null}
    >
      <SearchPreview keyword={keyword} />
      <SearchRecent keyword={keyword} />
    </RootModal>
  );
};

export default ModalSearch;
