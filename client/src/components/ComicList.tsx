import { Col, Divider, Row, Skeleton } from "antd";
import ComicItem from "./ComicItem";
import SkeletonComicList from "./skeleton/SkeletonComicList";

const ComicList = ({ data, loading }: any) => {
  if (loading) {
    return (
      <div className="p-6">
        <SkeletonComicList quantity={24} />
      </div>
    );
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
