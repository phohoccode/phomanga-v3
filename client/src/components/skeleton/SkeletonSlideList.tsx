"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/assets/styles/swiper.css";
import { EffectCoverflow } from "swiper/modules";
import { Skeleton } from "antd";

const SkeletonSlideList = () => {
  return (
    <Swiper
      modules={[EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      initialSlide={12}
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
      {[...Array(24)].map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton.Node style={{ width: 280, height: 360 }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SkeletonSlideList;
