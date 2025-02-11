import Spinner from "@/components/common/Spinner";
import InfoComic from "@/components/pages/info-comic/InfoComic";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <InfoComic />
    </Suspense>
  );
};

export default Page;
