import { PATHS } from "./PATHS";
import Register from "../components/Register";
import Login from "../components/Login";
export const publicRoutes = [
  {
    path: PATHS.LOGIN,
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: PATHS.REGISTER,
    element: (
      <>
        <Register />
      </>
    ),
  },
];
