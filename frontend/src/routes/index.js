import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { PATHS, BASE_PATH } from "./PATHS";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { NotFoundPage } from "../components/NotFoundPage";
import Home from "../components/Home";

import Cookies from "js-cookie";
export const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = Cookies.get("userToken") || null;
  // console.log(user);

  const commonRoutes = [
    { path: BASE_PATH, element: <Home /> },
    {
      path: PATHS.NOTFOUND,
      element: <NotFoundPage />,
    },
  ];
  useEffect(() => {
    if (
      user == null &&
      //   location.pathname !== PATHS.FORGETPASSWORD &&
      location.pathname !== PATHS.REGISTER &&
      location.pathname !== PATHS.LOGIN &&
      !commonRoutes.some((item) => item.path === location.pathname)
    ) {
      navigate(PATHS.LOGIN, { state: { from: location }, replace: true });
    }
  }, [location.pathname, user]);
  const routes = !!user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};
