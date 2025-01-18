import { Button, Empty } from "antd";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-6">
      <Empty description={"Trang bạn tìm kiếm không tồn tại!"} />
      <Link href={"/"}>
        <Button color="cyan" variant="solid">
          Trở về trang chủ
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
