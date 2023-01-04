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
import { MainProps } from "../Main";
import { StyledMain } from "../Main.styled";
import { useEffect, useState } from "react";
import { Pagination, Navigation } from "swiper";
import Header, { Logout } from "../../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../utilities/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  DocumentData,
} from "firebase/firestore";

const consoleImages = [
  { name: "N64", url: N64 },
  { name: "PS1", url: PS1 },
  { name: "PS2", url: PS2 },
  { name: "PS4", url: PS4 },
  { name: "LocNar", url: LocNar },
  { name: "Dreamcast", url: Dreamcast },
];

interface SwipeEffectProps extends MainProps {
  setNames: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
}
// The swipe effect on cards is from SwipeJs library
export default function SwipeEffect({
  setNames,
  setConsoleName,
  handleDisplayHiddenFolks,
}: SwipeEffectProps): JSX.Element {
  const [user, loading] = useAuthState(auth);
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
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    // Redirects to sign in page if not valid user
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      {user && (
        <>
          <Header>
            {
              <Logout
                name={name}
                signOut={logout}
                avatar={photoUrl}
                setNames={setNames}
                setConsoleName={setConsoleName}
              />
            }
          </Header>
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
              {consoleImages.map((image) => (
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
          </StyledMain>
        </>
      )}
    </>
  );
}
