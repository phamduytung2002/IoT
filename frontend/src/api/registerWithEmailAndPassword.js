import { axios } from "../utils/axios";

export const registerWithEmailAndPassword = (data) => {
  return axios.post("/api/register", data);
};
