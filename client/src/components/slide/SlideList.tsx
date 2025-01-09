"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/assets/styles/swiper.css";
import { EffectCoverflow } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchComicSlide } from "@/store/asyncThunk/comic";
import Link from "next/link";
import SlideItem from "./SlideItem";

const SlideList = () => {
  const comicSlide = useSelector((state: RootState) => state.comic.conmicSlide);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleFetchComicSlide = async () => {
      setIsLoading(true);
      await dispatch(fetchComicSlide());
      setIsLoading(false);
    };

    handleFetchComicSlide();
  }, []);

  return (
    <Swiper
      modules={[EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      initialSlide={2}
      speed={600}
      preventClicks={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      }}
      className="mySwiper"
    >
      {comicSlide?.map((slide: any, index: number) => (
        <SwiperSlide key={index}>
          <SlideItem slide={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideList;
