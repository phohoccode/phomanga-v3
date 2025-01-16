import Layout from "@/components/layout/Layout";
import SkeletonComicList from "@/components/skeleton/SkeletonComicList";
import { Breadcrumb, Divider } from "antd";

const Loading = () => {
  const items = [{ title: "Trang chủ" }, { title: "Kho lưu trữ" }];

  return (
    <Layout>
      <Breadcrumb items={items} />
      <Divider orientation="center">Kho lưu trữ</Divider>
      <SkeletonComicList quantity={24} />
    </Layout>
  );
};

export default Loading;
