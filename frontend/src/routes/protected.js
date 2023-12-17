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
  // {
  //   path: PATHS.LOGOUT,
  //   element: <>Đang đăng xuất...</>,
  // },
];
