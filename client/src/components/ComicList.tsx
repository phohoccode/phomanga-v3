import { Col, Divider, Row, Skeleton } from "antd";
import ComicItem from "./ComicItem";
import SkeletonComicList from "./skeleton/SkeletonComicList";
import EmptyData from "./common/EmptyData";

const ComicList = ({ data, loading }: any) => {
  if (loading) {
    return <SkeletonComicList quantity={24} />;
  }

  if (!data && !loading) {
    return <EmptyData description="Không có dữ liệu" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {data?.map((comic: any, index: number) => (
        <Col key={index} xs={12} sm={8} md={6} lg={4} xl={3} xxl={2}>
          <ComicItem data={comic} />
        </Col>
      ))}
    </Row>
  );
};

export default ComicList;
