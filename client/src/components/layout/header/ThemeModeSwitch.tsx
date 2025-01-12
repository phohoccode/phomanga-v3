import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

export const ThemeModeSwitch = () => {
  return (
    <Segmented<string>
      options={[
        { value: "light", icon: <SunOutlined /> },
        { value: "dark", icon: <MoonOutlined /> },
      ]}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};
