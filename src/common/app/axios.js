import axios from "axios";
import { accessForbiddenResponse, invalidTokenResponse, needReauthenticateResponse, tokenExpiredResponse } from "./message";
import { logout, refreshToken } from "../api/auth";

let isRefresh = true;

axios.interceptors.response.use(async response => {
    const originalRequest = response.config;
    
    if (response.data.message === tokenExpiredResponse) {
      const isRefreshNewInstance = isRefresh;
  
      if (isRefreshNewInstance) {
        isRefresh = false;
        
        const refreshAccessToken = await refreshToken(localStorage.getItem('refreshToken'));
        if(!refreshAccessToken.success) {
          await logout();
          localStorage.clear();
          window.location.replace('/login');
        }
        localStorage.setItem('accessToken', refreshAccessToken.data.accessToken);
        localStorage.setItem('refreshToken', refreshAccessToken.data.refreshToken);
  
        isRefresh = true;
        originalRequest.headers.Authorization = `Bearer ${refreshAccessToken.data.accessToken}`;
        return await axios.request(originalRequest);
      } else {
        return await axios.request(originalRequest);
      }
  
    } else if (response.data.message === needReauthenticateResponse) {
      await logout(localStorage.getItem('refreshToken'));
      localStorage.clear();
      window.location.replace('/login');
    } else if (response.data.message === invalidTokenResponse) {
      await logout(localStorage.getItem('refreshToken'));
      localStorage.clear();
      window.location.replace('/login');
    }
  
    return response;
});
  
axios.interceptors.request.use(
(config) => {
    console.log(123);
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
},
(error) => {
    return Promise.reject(error);
}
);