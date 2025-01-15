"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/assets/styles/swiper.css";
import { EffectCoverflow } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchComicSlide } from "@/store/asyncThunk/comicAsyncThunk";
import SlideItem from "./SlideItem";
import SkeletonSlideList from "./skeleton/SkeletonSlideList";

const SlideList = () => {
  const { items, loading } = useSelector(
    (state: RootState) => state.comic.conmicSlide
  );
  const dispatch: AppDispatch = useDispatch();
  const width = useSelector((state: RootState) => state.system.width);

  useEffect(() => {
    dispatch(fetchComicSlide());
  }, []);

  if (loading) {
    return <SkeletonSlideList width={width} />;
  }

  return (
    <Swiper
      modules={[EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      initialSlide={width > 1024 ? 13 : 6}
      speed={600}
      preventClicks={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }}
      className="mySwiper"
    >
      {items
        ?.slice(0, width > 1024 ? 24 : 12)
        ?.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            <SlideItem slide={slide} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SlideList;
