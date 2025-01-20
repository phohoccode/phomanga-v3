import { Button } from "antd";
import React, { useState } from "react";

const ShowMoreText = ({
  text,
  maxLength = 100,
}: {
  text: string;
  maxLength?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded ? text : text?.slice(0, maxLength);

  return (
    <div className="flex flex-col gap-1">
      <p className="break-all">
        {displayText}
        {text?.length > maxLength && !isExpanded && "..."}
      </p>

      {text?.length > maxLength && (
        <Button
          size="small"
          variant="text"
          color="default"
          onClick={toggleText}
          className="flex ml-auto text-gray-600"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
};

export default ShowMoreText;
