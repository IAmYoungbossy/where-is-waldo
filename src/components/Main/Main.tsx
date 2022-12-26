import { Route, Routes } from "react-router-dom";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import MapImage from "./SwipeEffect/MapImage/MapImage";
import SwipeEffect from "./SwipeEffect/SwipeEffect";
import Dreamcast from "../assets/P-Dreamcast-min.jpg";
import LocNar from "../assets/P-Loc-Nar-min.jpg";
import N64 from "../assets/P-N64-min.jpg";
import PS1 from "../assets/P-PS1-min.jpg";
import PS2 from "../assets/P-PS2-min.jpg";
import PS4 from "../assets/P-PS4-min.jpg";
import { hiddenFolksType } from "../App/App";

export interface MainProps {
  handleDisplayHiddenFolks: (alt: string) => void;
  hiddenFolks: hiddenFolksType[];
}

export function Main({ ...props }: MainProps): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<SwipeEffect {...props} />} />
        <Route
          path="/dashboard/N64"
          element={<MapImage src={N64} alt="N64" {...props} />}
        />
        <Route
          path="/dashboard/PS1"
          element={<MapImage src={PS1} alt="PS1" {...props} />}
        />
        <Route
          path="/dashboard/PS2"
          element={<MapImage src={PS2} alt="PS2" {...props} />}
        />
        <Route
          path="/dashboard/PS4"
          element={<MapImage src={PS4} alt="PS4" {...props} />}
        />
        <Route
          path="/dashboard/LocNar"
          element={<MapImage src={LocNar} alt="LocNar" {...props} />}
        />
        <Route
          path="/dashboard/Dreamcast"
          element={<MapImage src={Dreamcast} alt="Dreamcast" {...props} />}
        />
      </Routes>
    </>
  );
}
