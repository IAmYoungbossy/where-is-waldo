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
import { Link } from "react-router-dom";
import { MainProps } from "../Main";

export default function SwipeEffect({
  handleDisplayHiddenFolks,
}: MainProps): JSX.Element {
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
          <Link to="/dashboard/N64">
            <img
              src={N64}
              alt="N64"
              onClick={handleDisplayHiddenFolks.bind(null, "N64")}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/dashboard/PS1">
            <img
              src={PS1}
              alt="PS1"
              onClick={handleDisplayHiddenFolks.bind(null, "PS1")}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/dashboard/Dreamcast">
            <img
              src={Dreamcast}
              alt="Dreamcast"
              onClick={handleDisplayHiddenFolks.bind(null, "Dreamcast")}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/dashboard/PS2">
            <img
              src={PS2}
              alt="PS2"
              onClick={handleDisplayHiddenFolks.bind(null, "PS2")}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/dashboard/LocNar">
            <img
              src={LocNar}
              alt="LocNar"
              onClick={handleDisplayHiddenFolks.bind(null, "LocNar")}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/dashboard/PS4">
            <img
              src={PS4}
              alt="PS4"
              onClick={handleDisplayHiddenFolks.bind(null, "PS4")}
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
