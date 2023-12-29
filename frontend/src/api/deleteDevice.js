import { axios } from "../utils/axios";

export const deleteDevice = (data) => {
  return axios.delete("/device/device/delete", { data });
};
