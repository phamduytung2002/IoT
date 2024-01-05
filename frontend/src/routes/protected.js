import Home from "../components/Home";
import { Profile } from "../components/Profile";
import { PATHS, BASE_PATH } from "./PATHS";
export const protectedRoutes = [
  { path: BASE_PATH, element: <Home /> },
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
