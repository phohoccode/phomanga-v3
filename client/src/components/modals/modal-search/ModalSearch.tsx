"use client";

import Search from "antd/es/input/Search";
import RootModal from "../RootModal";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setShowModalSearch } from "@/store/slices/systemSlice";
import { message } from "antd";
import { useEffect, useState } from "react";
import SearchPreview from "./SearchPreview";
import { fetchSearchComicPreview } from "@/store/asyncThunk/comicAsyncThunk";
import debounce from "debounce";
import SearchHistory from "./SearchHistory";
import { addSearchHistory } from "@/store/asyncThunk/userAsyncThunk";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

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

  const onSearch = (value: string) => {
    if (value?.trim() === "") {
      message.info("Bạn mmuốn tìm kiếm gì?");
      return;
    }
    router.push(`/tim-kiem?keyword=${value}&page=1`);
    dispatch(setShowModalSearch(false));

    if (session?.user?.id) {
      dispatch(addSearchHistory({ userId: session?.user?.id, keyword: value }));
    }
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
      <SearchHistory keyword={keyword} />
    </RootModal>
  );
};

export default ModalSearch;
