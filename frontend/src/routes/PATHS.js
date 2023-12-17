export const BASE_PATH = "/";
export const BASE_PATH_AUTH = "/auth/";
export const PATHS = {
  LOGIN: `${BASE_PATH_AUTH}login`,
  REGISTER: `${BASE_PATH_AUTH}register`,
  // Common routes
  HOME: `${BASE_PATH}`,
  NOTFOUND: `${BASE_PATH}*`,
  // profile
  LOGOUT: `${BASE_PATH}logout`,
  PROFILE: `${BASE_PATH}profile`,
};
