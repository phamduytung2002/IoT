import Home from "../components/Home";
import { Profile } from "../components/Profile";
import { PATHS } from "./PATHS";
export const protectedRoutes = [
  {
    path: PATHS.PROFILE,
    element: (
      <>
        <Profile />
      </>
    ),
    
  },
  {
    path: PATHS.HOME_PROFILE,
    element: (
      <>
        <Home />
      </>
    ),
    children: [{ path: ":homeId" }],
  },

  // {
  //   path: PATHS.LOGOUT,
  //   element: <>Đang đăng xuất...</>,
  // },
];
