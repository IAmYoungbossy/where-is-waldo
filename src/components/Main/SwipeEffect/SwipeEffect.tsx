/* eslint-disable react-hooks/exhaustive-deps */
import "swiper/css";
import "../Main.css";
import "./SwipeEffect.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../Header/Header.css";
import { useEffect, useState } from "react";
import { hiddenFolksType } from "../../App/App";
import { Pagination, Navigation } from "swiper";
import { DocumentData } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import Header, { Logout } from "../../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../../utilities/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getImageURL } from "../../utilities/firebaseCRUD";
import React from "react";

interface ImageSlideProps {
  name: string;
  url: string;
}

interface SwipeEffectProps {
  hiddenFolks: hiddenFolksType[];
  userData: { name: string; profileUrl: string };
  handleDisplayHiddenFolks: (alt: string) => void;
  setPlayerName: React.Dispatch<
    React.SetStateAction<{ data: DocumentData; id: string }[]>
  >;
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

export default React.memo(function SwipeEffect({
  userData,
  setPlayerName,
  setConsoleName,
  handleDisplayHiddenFolks,
}: SwipeEffectProps): JSX.Element {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [imageSlide, setImageSlide] = useState<ImageSlideProps[]>([]);

  useEffect(() => {
    getImageURL("console-slides", setImageSlide);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <>
      {user && (
        <>
          <Header>
            {
              <Logout
                signOut={logout}
                userData={userData}
                setNames={setPlayerName}
                setConsoleName={setConsoleName}
              />
            }
          </Header>
          <main>
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
              {imageSlide.map((image) => (
                <SwiperSlide key={image.name}>
                  <Link to={`/dashboard/${image.name}`}>
                    <img
                      src={image.url}
                      alt={image.name}
                      onClick={handleDisplayHiddenFolks.bind(
                        null,
                        `${image.name}`
                      )}
                    />
                  </Link>
                  <p>{image.name}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </main>
        </>
      )}
    </>
  );
});
