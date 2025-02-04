"use client";

import {
  setShowModalComment,
  setShowModalUserFeedback,
} from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MessageOutlined,
  ProductOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import { useDispatch } from "react-redux";

const FloatButtonGroup = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <FloatButton.Group
      trigger="click"
      placement="top"
      shape="circle"
      tooltip="Chức năng khác"
      icon={<ProductOutlined />}
    >
      <FloatButton
        onClick={handleScrollTop}
        tooltip="Cuộn lên đầu trang"
        icon={<ArrowUpOutlined />}
      />
      <FloatButton
        onClick={handleScrollBottom}
        tooltip="Cuộn xuống cuối trang"
        icon={<ArrowDownOutlined />}
      />
      <FloatButton
        onClick={() => dispatch(setShowModalComment(true))}
        tooltip="Bình luận"
        icon={<MessageOutlined />}
      />
      <FloatButton
        onClick={() => dispatch(setShowModalUserFeedback(true))}
        tooltip="Báo lỗi truyện"
        icon={<WarningOutlined />}
      />
    </FloatButton.Group>
  );
};

export default FloatButtonGroup;
