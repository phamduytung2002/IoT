import { axios } from "../utils/axios";

export const getAllDevice = (data) => {
  return axios.post("/device/device/getAllDevice",data);
};