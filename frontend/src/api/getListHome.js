// import { useQuery } from "@tanstack/react-query";
import { axios } from "../utils/axios";

export const getListHome = () => {
  return axios.get("/user/user/getAllHome");
};

// export const useGetListHome = (config) => {
//   const listHomeQuery = useQuery({
//     queryKey: ["list-home"],
//     queryFn: () => getListHome(),
//     ...config,
//     onError: (error) => {
//       // Handle errors here
//       console.error("Error fetching user info:", error);
//       return null; // Return null to indicate the error state
//     },
//   });
//   return listHomeQuery;
// };
