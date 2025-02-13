import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Empty, Image } from "antd";

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
              minWidth: "320px",
              minHeight: "320px",
              border: "0 1px 0 1px solid #f0f0f0",
            }}
            src={`https://sv1.otruyencdn.com/${item?.chapter_path}/${image?.image_file}`}
            placeholder={<Empty description="Đang tải hình ảnh..." />}
            alt={item?.chapter_name ?? "không xác định"}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default SessionImage;
