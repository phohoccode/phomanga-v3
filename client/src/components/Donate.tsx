"use client";

import { CoffeeOutlined } from "@ant-design/icons";
import { Divider, Image } from "antd";

const Donate = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Divider orientation="center">
        Ủng hộ tôi
        <CoffeeOutlined className="ml-1" />
      </Divider>
      <p className="my-4 text-sm">
        Nếu bạn yêu thích những bộ truyện trên website? Hãy ủng hộ tôi bằng một ly
        cà phê để giúp duy trì và phát triển nội dung tốt hơn! ❤️
      </p>
      <Image width={300} height={360} alt="QR-CODE" src="/images/donate.jpg" />
    </div>
  );
};

export default Donate;
