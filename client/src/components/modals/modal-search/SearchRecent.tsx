import {
  ClockCircleOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Tooltip, Typography } from "antd";
import Link from "next/link";

const SearchRecent = ({ keyword }: { keyword: string }) => {
  if (keyword?.trim() !== "") return null;

  return (
    <div className="flex flex-col">
      <Divider orientation="left">
        <Typography.Text type="secondary">Lịch sử tìm kiếm</Typography.Text>
      </Divider>
      <ul className="flex flex-col gap-2">
        {[...Array(5)].map((_, index: number) => (
          <li key={index} className="flex justify-between gap-2 items-center">
            <Link
              href={``}
              className="text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-700 p-2 flex-1 max-w-[88%] lg:max-w-[95%] flex items-center gap-2 transition-all"
            >
              <ClockCircleOutlined />
              <span className="w-full truncate">
                Truyện tranh Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Reprehenderit soluta pariatur doloremque, deleniti rem,
                qui ducimus id officia maxime quo debitis eos magni, odit
                expedita? Quibusdam, suscipit neque. Est, earum.
              </span>
            </Link>
            <Tooltip title="Xoá lịch sử" style={{ width: "10%" }}>
              <Button
                size="small"
                icon={<CloseOutlined />}
                variant="text"
                color="default"
              />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRecent;
