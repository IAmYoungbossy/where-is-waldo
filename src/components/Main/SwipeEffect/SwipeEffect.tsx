// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./SwipeEffect.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import PS1 from "../../assets/PS1.jpg";
import PS2 from "../../assets/PS2.jpg";
import PS4 from "../../assets/PS4.jpg";
import N64 from "../../assets/N64.jpg";
import LocNar from "../../assets/Loc-nar.jpg";
import Dreamcast from "../../assets/Dreamcast.jpg";

// import required modules
import { Pagination, Navigation } from "swiper";

export default function SwipeEffect() {
  return (
    <>
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          750: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
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
          <img src={Dreamcast} alt="Dreamcast" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={PS2} alt="PS2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={LocNar} alt="game" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={PS4} alt="PS4" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
