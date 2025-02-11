"use client";

import { isPositiveInteger } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const useGetQuery = (
  query: string,
  defaultValue: string,
  dataType: "number" | "string",
  desiredValue?: string
) => {
  const searchParams = useSearchParams();

  if (dataType === "number") {
    return isPositiveInteger(searchParams.get(query) as string)
      ? searchParams.get(query)
      : defaultValue;
  } else if (dataType === "string") {
    return searchParams.get(query) === desiredValue
      ? desiredValue
      : defaultValue;
  }
};

export default useGetQuery;
