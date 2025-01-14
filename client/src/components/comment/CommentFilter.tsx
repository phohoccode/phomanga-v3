import { FilterComment } from "@/lib/types";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const CommentFilter = () => {
  const [filter, setFilter] = useState<FilterComment>("recent");

  return (
    <>
      {filter === "recent" ? (
        <Button
          onClick={() => setFilter("oldest")}
          size="small"
          type="text"
          icon={<SortDescendingOutlined />}
        >
          Gần đây
        </Button>
      ) : (
        <Button
          onClick={() => setFilter("recent")}
          size="small"
          type="text"
          icon={<SortAscendingOutlined />}
        >
          Cũ nhất
        </Button>
      )}
    </>
  );
};

export default CommentFilter;
