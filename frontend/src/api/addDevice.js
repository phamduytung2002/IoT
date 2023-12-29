import { axios } from "../utils/axios";

export const addDevice = (data) => {
  return axios.post("/device/device/create", data);
};