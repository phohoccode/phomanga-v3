import Spinner from "@/components/common/Spinner";
import SearchComic from "@/components/pages/search-comic/SearchComic";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchComic />
    </Suspense>
  );
};

export default Page;
