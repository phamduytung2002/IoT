import Axios from "axios";
export const API_URL = "https://api.abcabc.vn";
export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100,
  timeoutErrorMessage: "hahahahahahahahhaha",
});
