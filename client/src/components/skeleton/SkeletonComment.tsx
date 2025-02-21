import { Skeleton } from "antd";

const SkeletonComment = () => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      {[...Array(3)].map((_, index) => (
        <div className="flex gap-4" key={index}>
          <div className="flex flex-col gap-2 items-center">
            <Skeleton.Avatar key={index} size={32} />
            <Skeleton.Button style={{ width: 32, height: 18 }} size="small" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton.Input style={{ width: "20%", height: 16 }} size="small" />
            <Skeleton.Input
              style={{ width: "100%", height: 18 }}
              size="small"
            />
            <Skeleton.Input style={{ width: "80%", height: 18 }} size="small" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonComment;
