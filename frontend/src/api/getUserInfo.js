// import { useQuery } from "@tanstack/react-query";
// import axios from "~/utils/axios"

// export const getUserInfo = () => {
//   return axios.get("/user/user/getUser");
// };

// export const useUserInfo = (config) => {
//   const userInfoQuery = useQuery({
//     queryKey: ["user-info"],
//     queryFn: () => getUserInfo(),
//     ...config,
//     onError: (error) => {
//       // Handle errors here
//       console.error("Error fetching user info:", error);
//       return null; // Return null to indicate the error state
//     },
//   });
//   return userInfoQuery;
// };
