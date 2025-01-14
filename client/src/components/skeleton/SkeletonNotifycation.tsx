import { Divider, Skeleton } from "antd";

const quantity = 3;

const SkeletonNotifycation = () => {
  return (
    <div className=" mt-4">
      {[...Array(quantity)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton.Input active size="small" style={{ width: "60%" }} />
          <Skeleton.Input active size="small" style={{ width: "80%" }} />
          <Skeleton.Input active size="small" style={{ width: "40%" }} />
          {index !== quantity - 1 && <Divider style={{ margin: "12px 0" }} />}
        </div>
      ))}
    </div>
  );
};

export default SkeletonNotifycation;
