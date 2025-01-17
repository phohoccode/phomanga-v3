import { Button, Divider, Skeleton } from "antd";

const ComicTitle = ({
  title,
  orientation,
  loading,
}: {
  title: string;
  orientation: "left" | "right" | "center";
  loading?: boolean;
}) => {
  return (
    <Divider orientation={orientation}>
      {loading ? (
        <Skeleton.Input style={{ width: "100%" }} size="small" />
      ) : (
        title
      )}
    </Divider>
  );
};

export default ComicTitle;
