"use client";

import { RootState } from "@/store/store";
import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const LOCAL_STORAGE_KEY = "themeMode";

enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

const AntdConfigProvider = ({ children }: Props) => {
  const { themeMode } = useSelector((state: RootState) => state.system);

  const THEME = {
    algorithm:
      themeMode === ThemeMode.Dark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm,
    token: {
      colorPrimary: themeMode === ThemeMode.Dark ? "#15395b" : "#13c2c2",
      colorLink: themeMode === ThemeMode.Dark ? "#15395b" : "#13c2c2",
      colorTextBase: themeMode === ThemeMode.Dark ? "#ffffff" : "#000000",
    },
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, themeMode);
    if (themeMode === ThemeMode.Dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [themeMode]);

  return <ConfigProvider theme={THEME}>{children}</ConfigProvider>;
};

type Props = {
  children: React.ReactNode;
};

export default AntdConfigProvider;
