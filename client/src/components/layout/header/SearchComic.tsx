"use client";

import { setShowModalSearch } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const SearchComic = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Button
      style={{ backgroundColor: "transparent" }}
      onClick={() => dispatch(setShowModalSearch(true))}
      icon={<SearchOutlined />}
    >
      Tìm kiếm truyện tranh ...
    </Button>
  );
};

export default SearchComic;
