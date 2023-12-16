import { axios } from "../utils/axios";

export const loginWithEmailAndPassword = (data) => {
  return axios.post("/api/login", data);
};
