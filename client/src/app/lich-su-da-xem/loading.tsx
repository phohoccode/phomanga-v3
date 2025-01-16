import Layout from "@/components/layout/Layout";
import SkeletonComicList from "@/components/skeleton/SkeletonComicList";
import { Breadcrumb, Divider } from "antd";

const Loading = () => {
  const items = [{ title: "Trang chủ" }, { title: "Lịch sử đã xem" }];

  return (
    <Layout>
      <Breadcrumb items={items} />
      <Divider orientation="center">Lịch sử đã xem</Divider>
      <SkeletonComicList quantity={24} />
    </Layout>
  );
};

export default Loading;
