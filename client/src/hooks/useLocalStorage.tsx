"use client";

type LocalStorageValue =
  | string
  | number
  | boolean
  | any[]
  | Record<string, any>;

const useLocalStorage = () => {
  const getLocalStorage = (key: string, initValue?: LocalStorageValue) => {
    return JSON.parse(localStorage.getItem(key) as string) ?? initValue;
  };

  const setLocalStorage = (key: string, value: LocalStorageValue) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { getLocalStorage, setLocalStorage };
};

export default useLocalStorage;
