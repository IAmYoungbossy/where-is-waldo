/* eslint-disable react-hooks/exhaustive-deps */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./SwipeEffect.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import "../Main.css";
import "../../Header/Header.css";
import { MainProps } from "../Main";
import { useEffect } from "react";
import { Pagination, Navigation } from "swiper";
import { DocumentData } from "firebase/firestore";
import Header, { Logout } from "../../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../../utilities/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface SwipeEffectProps extends MainProps {
  setNames: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  userData: {
    name: string;
    profileUrl: string;
  };
  imageSlide: {
    name: string;
    url: string;
  }[];
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
}
// The swipe effect on cards is from SwipeJs library
export default function SwipeEffect({
  setNames,
  userData,
  imageSlide,
  setConsoleName,
  handleDisplayHiddenFolks,
}: SwipeEffectProps): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    // Redirects to sign in page if not valid user
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <>
      {user && (
        <>
          <Header>
            {
              <Logout
                userData={userData}
                signOut={logout}
                setNames={setNames}
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
}
