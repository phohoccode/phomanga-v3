"use client";

import { usePathname } from "next/navigation";
import { Col, Row } from "antd";
import { pathHideNavBar } from "@/lib/defind";

const Footer = () => {
  const pathname = usePathname();

  if (
    pathHideNavBar.includes(pathname) ||
    pathname.includes("/bang-dieu-khien")
  ) {
    return null;
  }

  return (
    <footer
      style={{
        background:
          "linear-gradient(to right, rgba(161, 196, 253, 0.59) 0%, rgba(194, 233, 251, 0.71) 100%)",
      }}
      className="footer mt-8 lg:mb-0 mb-16 md:px-6 px-3 py-12"
    >
      <Row gutter={[16, 16]}>
        <Col
          xxl={8}
          xl={8}
          lg={8}
          md={12}
          sm={24}
          xs={24}
          className="flex flex-col gap-2"
        >
          <h1 className="text-lg font-bold italic">Giới thiệu</h1>
          <p className="text-base">
            Dự án này được xây dựng với mục tiêu mang đến một nền tảng đọc
            truyện trực tuyến phong phú, tiện lợi và thân thiện với người dùng.
            Không chỉ đơn thuần là nơi giải trí, website còn hướng đến việc tạo
            ra một không gian kết nối cộng đồng yêu thích truyện tranh.
          </p>
        </Col>
        <Col
          xxl={8}
          xl={8}
          lg={8}
          md={12}
          sm={24}
          xs={24}
          className="flex flex-col gap-2"
        >
          <h1 className="text-lg font-bold italic">Bản quyền</h1>
          <p className="text-base">
            Tất cả nội dung của trang web này đều được tìm kiếm và thu thập trực
            tiếp trên Internet. Nếu quyền lợi của bạn bị vi phạm, hãy liên hệ
            với chúng tôi. Chúng tôi sẽ xử lý và xóa các nội dung liên quan đó
            kịp thời. Xin cảm ơn!
          </p>
        </Col>
        <Col
          xxl={8}
          xl={8}
          lg={8}
          md={12}
          sm={24}
          xs={24}
          className="flex flex-col gap-2"
        >
          <h1 className="text-lg font-bold italic">Liên hệ với tôi</h1>
          <div className="flex flex-col gap-2 text-base">
            <a
              className="hover:text-[#13c2c2] transition-all"
              href="https://www.facebook.com/phohoccode.2004"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Facebook
            </a>
            <a
              className="hover:text-[#13c2c2] transition-all"
              href="https://github.com/phohoccode"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Github
            </a>
            <a
              className="hover:text-[#13c2c2] transition-all"
              href="https://t.me/phohoccode_04"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Telegram
            </a>
          </div>
        </Col>
        <Col
          xxl={24}
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          className="text-center text-base mt-4 font-semibold text-[#13c2c2]"
        >
          © 2025 - Phát triển bởi phohoccode
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
