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
];
