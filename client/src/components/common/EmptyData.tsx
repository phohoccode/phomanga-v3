import { Empty } from "antd";

const EmptyData = ({
  description,
}: {
  description: string | React.ReactNode;
}) => {
  return (
    <div className="flex justify-center items-center h-80">
      <Empty description={description} />
    </div>
  );
};

export default EmptyData;
