import { axios } from "../utils/axios";

export const postCloseOrOpen = (data) => {
  return axios.post("/device/device/postCloseOrOpen", data);
};
