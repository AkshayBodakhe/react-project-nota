declare global {
  interface Window {
    currentNxProject: string;
  }
}

import axios from "axios";
// import {
//   tokenType,
//   therapistToken,
//   therapistRefreshToken,
// } from '../services/tokenManagementService/constant';
// import tokenManagementService from '../services/tokenManagementService/tokenService';
// import cookieService from '../services/tokenManagementService/cookiesStorageService';

// const API_BASE_URL = "https://dev.api.navalaglobal.com";

export const API_BASE_URL = "https://dev.api.navalaglobal.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((request: any) => {
  const acessToken = sessionStorage.getItem("accessToken");
  const tokenType = "Bearer";
  if (acessToken !== "") {
    request.headers.Authorization = `${tokenType} ${acessToken}`;
  }
  request.headers["Access-Control-Allow-Origin"] = "*";
  request.headers["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";
  request.headers["Access-Control-Allow-Methods"] =
    "GET, POST, PUT, DELETE, OPTIONS";
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== "/auth/login") {
        // window.location.assign('/auth/login');
      }
      return;
    }
    return error.response;
  }
);

export default axiosInstance;
