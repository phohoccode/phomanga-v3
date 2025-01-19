import { RootState } from "@/store/store";
import { Image, Skeleton } from "antd";
import { useSelector } from "react-redux";

const SessionImage = ({ item }: any) => {
  const width = useSelector((state: RootState) => state.system.width);

  return (
    <div className="flex flex-col items-center mt-8">
      <Image.PreviewGroup>
        {item?.chapter_image?.map((image: any, index: number) => (
          <Image
            loading="lazy"
            key={index}
            style={{
              width: width > 1024 ? "720px" : "100%",
              minHeight: "320px",
            }}
            src={`https://sv1.otruyencdn.com/${item?.chapter_path}/${image?.image_file}`}
            alt={item?.chapter_name ?? "không xác định"}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default SessionImage;
