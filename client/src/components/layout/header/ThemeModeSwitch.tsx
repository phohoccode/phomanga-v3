"use client";

import { setThemeMode } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";

export const ThemeModeSwitch = () => {
  const dispatch: AppDispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.system.themeMode);

  return (
    <Segmented<string>
      options={[
        { value: "light", icon: <SunOutlined /> },
        { value: "dark", icon: <MoonOutlined /> },
      ]}
      defaultValue={themeMode}
      onChange={(value) => {
        dispatch(setThemeMode(value));
      }}
    />
  );
};
