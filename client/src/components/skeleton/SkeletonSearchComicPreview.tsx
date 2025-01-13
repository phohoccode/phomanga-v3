import { Skeleton } from "antd";

const SkeletonSearchComicPreview = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Skeleton.Input style={{ width: "240px", height: "16px" }} size="small" />
      <>
        {[...Array(3)].map((_, index: number) => (
          <div key={index} className="flex gap-2">
            <figure className="w-24 h-32 rounded-md overflow-hidden border border-gray-200">
              <Skeleton.Node style={{ width: "96px", height: "128px" }} />
            </figure>
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton.Input
                style={{ width: "40%", height: "12px" }}
                size="small"
              />
              <Skeleton.Input
                style={{ width: "60%", height: "12px" }}
                size="small"
              />

              <Skeleton.Input
                style={{ width: "50%", height: "12px" }}
                size="small"
              />
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default SkeletonSearchComicPreview;
