"use client";

import {
  setShowModalComment,
  setShowModalUserFeedback,
} from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ExceptionOutlined,
  MessageOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

const FloatButtonGroup = () => {
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  if (pathname.startsWith("/bang-dieu-khien") || pathname.startsWith("/auth")) {
    return null;
  }

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

      {pathname.startsWith("/dang-xem") && (
        <FloatButton
          onClick={() => dispatch(setShowModalComment(true))}
          tooltip="Bình luận"
          icon={<MessageOutlined />}
        />
      )}

      <FloatButton
        onClick={() => dispatch(setShowModalUserFeedback(true))}
        tooltip="Phản hồi"
        icon={<ExceptionOutlined />}
      />
    </FloatButton.Group>
  );
};

export default FloatButtonGroup;
