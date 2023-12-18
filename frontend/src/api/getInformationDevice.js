import { axios } from "../utils/axios";

export const getInformation = (data) => {
  return axios.post("/device/device/getInformation", data);
};
