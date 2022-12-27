/* eslint-disable react-hooks/exhaustive-deps */
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
import { Link, useNavigate } from "react-router-dom";
import { MainProps } from "../Main";
import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../utilities/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function SwipeEffect({
  handleDisplayHiddenFolks,
}: MainProps): JSX.Element {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const photoUrl: string | null | undefined = user?.photoURL;

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(error?.message);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      {user && (
        <>
          <Header name={name} signOut={logout} avatar={photoUrl} />
          <StyledMain>
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
          </StyledMain>
        </>
      )}
    </>
  );
}
