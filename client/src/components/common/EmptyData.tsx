import { Empty } from "antd";

const EmptyData = ({ description }: { description: string }) => {
  return (
    <div className="flex justify-center items-center h-96">
      <Empty description={description} />
    </div>
  );
};

export default EmptyData;
