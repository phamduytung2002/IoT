import Cookies from "js-cookie";
import { configureAuth } from "react-query-auth";
import { PATHS } from "../routes/PATHS";
import { loginWithEmailAndPassword } from "../api/loginWithEmailAndPassword";
import { registerWithEmailAndPassword } from "../api/registerWithEmailAndPassword";
// Import other necessary modules

async function handleUserResponse(data) {
  const user = data;

  // Set user information in cookies
  Cookies.set("userToken", user.token);
  Cookies.set("systemRole", user.system_role);
  Cookies.set("timestamp", new Date());
  Cookies.set("deviceToken", user.device_token);

  return user;
}

export async function userFn() {
  // Get user information from cookies

  return (
    Cookies.get("userToken") ||
    Cookies.get("systemRole") ||
    Cookies.get("timestamp") ||
    Cookies.get("deviceToken") ||
    null
  );
}

export async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

export async function registerFn(data) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

export async function logoutFn() {
  // Remove user information from cookies
  Cookies.remove("userToken");
  Cookies.remove("systemRole");
  Cookies.remove("timestamp");
  Cookies.remove("deviceToken");

  window.location.assign(PATHS.LOGIN);
}

// const authConfig = {
//   userFn,
//   loginFn,
//   registerFn,
//   logoutFn,
// };

// export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
//   configureAuth(authConfig);
