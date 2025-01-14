"use client";

import { Button, Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

const CommentInput = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Bạn đang suy nghĩ gì thế ..."
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <Button
        color="cyan"
        variant="solid"
        style={{ display: "flex", margin: "12px 0 0 auto" }}
      >
        Bình luận
      </Button>
    </div>
  );
};

export default CommentInput;
