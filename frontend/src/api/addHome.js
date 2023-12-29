import { axios } from "../utils/axios";

export const addHome = (data) => {
  return axios.post("/user/user/addHome", data);
};
