import axios, { AxiosRequestConfig,AxiosResponse }from "axios";
import {App} from 'vue'
const request = axios.create({
  baseURL:'/api/v3'
})
request.interceptors.request.use((req: AxiosRequestConfig) => {
  return req
})
request.interceptors.response.use((resp: AxiosResponse<any>) => {
  return resp
})
export default request