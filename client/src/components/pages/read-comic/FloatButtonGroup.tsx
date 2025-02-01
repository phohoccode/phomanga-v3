"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";

const FloatButtonGroup = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <FloatButton.Group
      trigger="click"
      placement="left"
      shape="square"
      style={{
        insetInlineEnd: "-12px",
        insetBlockEnd: "20%",
      }}
      closeIcon={<DoubleRightOutlined />}
      icon={<DoubleLeftOutlined />}
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
    </FloatButton.Group>
  );
};

export default FloatButtonGroup;
