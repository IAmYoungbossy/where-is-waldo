// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SwipeEffect.css";
import PS1 from "../../assets/PS1.jpg";
import N64 from "../../assets/N64.jpg";
import Dreamcast from "../../assets/Dreamcast.jpg";

// import required modules
import { Pagination, Navigation } from "swiper";

export default function SwipeEffect() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={N64} alt="Game console" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={PS1} alt="game" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Dreamcast} alt="game" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
