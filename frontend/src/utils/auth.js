import Cookies from "js-cookie";
// import { configureAuth } from "react-query-auth";
import { PATHS } from "../routes/PATHS";
import { loginWithEmailAndPassword } from "../api/loginWithEmailAndPassword";
import { registerWithEmailAndPassword } from "../api/registerWithEmailAndPassword";
// Import other necessary modules

async function handleUserResponse(data) {
  const user = data;
  // Set user information in cookies
  // Cookies.set("systemRole", user.system_role);
  // Cookies.set("deviceToken", user.device_token);
  Cookies.set("userToken", user.data.token);
  Cookies.set("timestamp", new Date());

  return user;
}

// Note: Don't need to use this function if you don't need to get user information because of the cookies.get directly in the loginFn function
// This function has error when using with react-query-auth by returning a promise

// export async function userFn() {
//   console.log("userFn", Cookies.get("userToken"));
//   return {
//     // Get user information from cookies
//     // systemRole: Cookies.get("systemRole") || null,
//     // deviceToken: Cookies.get("deviceToken") || null,
//     userToken: Cookies.get("userToken") || null,
//     timestamp: Cookies.get("timestamp") || null,
//   };
// }

export async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  if (response.data.token) {
    const user = await handleUserResponse(response);
    return user;
  } else {
    console.log("error database:", response.data);
    return "Error";
  }
}

export async function registerFn(data) {
  const response = await registerWithEmailAndPassword(data);
  if (response.data.username) {
    return response;
  } else {
    console.log("error database:", response.data);
    return "Error";
  }
}

export async function logoutFn() {
  // Remove user information from cookies
  // Cookies.remove("systemRole");
  // Cookies.remove("deviceToken");
  console.log("logout");
  Cookies.remove("userToken");
  Cookies.remove("timestamp");

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
