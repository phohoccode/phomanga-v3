import Spinner from "@/components/common/Spinner";
import DeltailComic from "@/components/pages/detail-comic/DetailComic";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <DeltailComic />
    </Suspense>
  );
};

export default Page;
