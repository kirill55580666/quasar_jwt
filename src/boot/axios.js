import { boot } from 'quasar/wrappers'
import axios from 'axios'
import {LocalStorage} from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export const baseURL = `http://localhost:7000`

// instance of axios
const api = axios.create({ baseURL: baseURL, withCredentials: true})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${LocalStorage.getItem('accessToken')}`
  return config;
});


api.interceptors.response.use((config) => {
  return config;
},async (error) => {
  const originalRequest = error.config;
  if (error?.response?.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${baseURL}/auth/refresh`, {withCredentials: true})
      localStorage.setItem('accessToken', response.data.accessToken);
      return api.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН')
    }
  }
  throw error;
})


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
