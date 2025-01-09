"use client";

import RootModal from "./RootModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCategorys } from "@/store/asyncThunk/comic";
import { Skeleton } from "antd";
import { setShowModalCategorys } from "@/store/slices/systemSlice";

const ModalCategorys = ({
  isModalOpen,
  onCancel,
}: {
  isModalOpen: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleDispatch = async () => {
      setIsLoading(true);
      await dispatch(fetchCategorys());
      setIsLoading(false);
    };

    handleDispatch();
  }, []);

  const categorys = useSelector((state: RootState) => state.comic.catetorys);

  return (
    <RootModal
      title="Danh mục truyện tranh"
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      {isLoading && <Skeleton style={{ marginTop: "12px" }} />}
      <ul className="flex flex-wrap gap-2 mt-4">
        {categorys?.map((category, index) => (
          <li
            key={index}
            className="flex-auto"
            onClick={() => dispatch(setShowModalCategorys(false))}
          >
            <Link
              href={`/chi-tiet/the-loai/${category?.slug}`}
              className="p-2 rounded-md hover:bg-slate-100 text-base hover:text-[#13c2c2] cursor-pointer"
            >
              {category?.name}
            </Link>
          </li>
        ))}
      </ul>
    </RootModal>
  );
};

export default ModalCategorys;
