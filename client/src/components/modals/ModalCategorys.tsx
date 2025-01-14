"use client";

import RootModal from "./RootModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCategorys } from "@/store/asyncThunk/comic";
import { Col, Row, Skeleton } from "antd";
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
      title="Thể loại truyện tranh"
      isModalOpen={isModalOpen}
      onCancel={onCancel}
    >
      {isLoading && <Skeleton style={{ marginTop: "12px" }} />}
      <Row gutter={[8, 8]} className="mt-4 max-h-[80vh] overflow-y-auto">
        {categorys?.map((category: any, index: number) => (
          <Col
            key={index}
            xl={4}
            md={6}
            sm={8}
            xs={12}
            onClick={() => dispatch(setShowModalCategorys(false))}
          >
            <Link
              href={`/chi-tiet/the-loai/${category?.slug}`}
              className=" w-full block p-2 rounded-md hover:bg-slate-100 text-base hover:text-[#13c2c2] cursor-pointer"
            >
              {category?.name}
            </Link>
          </Col>
        ))}
      </Row>
    </RootModal>
  );
};

export default ModalCategorys;
