import SlideList from "@/components/slide/SlideList";
import { fetchComicSlide } from "@/lib/actions";

export default async function Home() {


  return (
    <div className="lg:p-6 p-4">
      <SlideList />
    </div>
  );
}
