import { Skeleton } from "antd";

const SkeletonComment = () => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      {[...Array(5)].map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton.Avatar key={index} active size={32} />
          <div className="flex flex-col gap-2">
            <Skeleton.Input
              style={{ width: 220, height: 12 }}
              active
              size="small"
            />
            <Skeleton.Input style={{ width: 260 }} active size="small" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonComment;
