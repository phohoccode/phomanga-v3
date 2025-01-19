import { Skeleton } from "antd";

const SkeletonReadPage = ({ width }: { width: number }) => {
  return (
    <div className="p-6 flex flex-col gap-2">
      <Skeleton.Input size="small" style={{ width: "30%" }} />
      <div className="flex flex-col gap-2 items-center justify-center mt-8 rounded-lg bg-gray-100 p-4">
        <Skeleton.Input size="small" style={{ width: "220px" }} />

        <div className="flex gap-2 flex-col md:flex-row items-center justify-center">
          <Skeleton.Button size="small" style={{ width: "120px" }} />
          <Skeleton.Button size="small" style={{ width: "120px" }} />
          <Skeleton.Button size="small" style={{ width: "120px" }} />
        </div>
      </div>

      <div className="flex flex-col items-center mt-8 gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton.Node
            key={index}
            style={{
              width: width > 768 ? "768px" : "320px",
              height: "400px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonReadPage;
