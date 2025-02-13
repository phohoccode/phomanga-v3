import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Select, Typography } from "antd";

const SessionControls = ({
  dataInfoComic,
  dataChapterComic,
  location,
}: any) => {
  const params = useParams();
  const router = useRouter();
  const [currentId, setCurrentId] = useState(params?.id as string);
  const chapters = dataInfoComic?.chapters?.[0]?.server_data ?? [];

  const optionsSelect = [
    ...chapters?.map((item: any) => {
      return {
        value: item?.chapter_api_data?.split("/").pop(),
        label: `Chương ${item?.chapter_name}`,
      };
    }),
  ];

  const handlePrevChapter = () => {
    const index = chapters?.findIndex(
      (item: any) => item?.chapter_api_data?.split("/").pop() === currentId
    );
    if (index > 0) {
      router.push(
        `/dang-xem/${params?.slug}/${chapters[index - 1]?.chapter_api_data
          ?.split("/")
          .pop()}`
      );
      setCurrentId(chapters[index - 1]?.chapter_api_data?.split("/").pop());
    }
  };

  const handleNextChapter = () => {
    const index = chapters?.findIndex(
      (item: any) => item?.chapter_api_data?.split("/").pop() === currentId
    );
    if (index < chapters.length - 1) {
      router.push(
        `/dang-xem/${params?.slug}/${chapters[index + 1]?.chapter_api_data
          ?.split("/")
          .pop()}`
      );
      setCurrentId(chapters[index + 1]?.chapter_api_data?.split("/").pop());
    }
  };

  const handleChangeChapter = (id: string) => {
    router.push(`/dang-xem/${params?.slug}/${id}`);
    setCurrentId(id);
  };

  return (
    <div
      className={`flex items-center justify-center mt-8 transition-all duration-300 lg:top-0
        ${
          location === "top" ? "flex-col gap-2 rounded-lg bg-gray-100 p-4" : ""
        } 
        lg:sticky left-0 right-0 lg:z-50`}
    >
      {location === "top" && (
        <Typography.Title level={4} style={{ color: "#13c2c2" }}>
          {dataInfoComic?.name ?? "không xác định"} -{" Chương "}
          {dataChapterComic?.chapter_name ?? "không xác định"}
        </Typography.Title>
      )}

      <div className="flex gap-2 flex-col md:flex-row items-center justify-center">
        <Button
          onClick={handlePrevChapter}
          disabled={
            chapters[0]?.chapter_api_data?.split("/").pop() === currentId
          }
          color="cyan"
          variant="solid"
          icon={<LeftOutlined />}
        >
          Chương trước
        </Button>

        <Button
          onClick={handleNextChapter}
          disabled={
            chapters[chapters.length - 1]?.chapter_api_data
              ?.split("/")
              .pop() === currentId
          }
          color="cyan"
          variant="solid"
          icon={<RightOutlined />}
          iconPosition="end"
        >
          Chương tiếp
        </Button>
        <Select
          value={params?.id as string}
          onChange={handleChangeChapter}
          options={optionsSelect}
        />
      </div>
    </div>
  );
};

export default SessionControls;
