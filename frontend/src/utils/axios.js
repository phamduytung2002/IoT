import Axios, {
  // type AxiosError,
  // type AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
export const API_URL = "http://localhost:8000";

function authRequestInterceptor(config) {
  const controller = new AbortController();
  const token = Cookies.get("userToken");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return {
    ...config,
    signal: controller.signal,
  };
}

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
  timeoutErrorMessage: "hahahahahahahahhaha",
});
export const axiosUploadFile = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axios.interceptors.request.use(authRequestInterceptor);
axiosUploadFile.interceptors.request.use(authRequestInterceptor);
