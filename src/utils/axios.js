import axios from "axios";
import { Toast } from "antd-mobile";
import { getToken } from "./index";

// 后台接口的基础地址
const BASE_URL = "https://api-haoke-web.itheima.net";
// 创建axios的实例(单例模式)
const instance = axios.create({
  baseURL: BASE_URL,
});

// 注册拦截器（request和response）

// Add a request interceptor
instance.interceptors.request.use(
  // 根据条件统一设置=》请求头headers=>token
  function (config) {
    const { url, headers } = config;
    if (
      url.startsWith("/user") &&
      url !== "/user/registered" &&
      url !== "/user/login"
    ) {
      headers.authorization = getToken();
    }
    // console.log("开始请求了", config);
    // 请求拦截器
    Toast.loading("加载中...", 1);
    // 响应拦截器
    Toast.hide();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("请求成功了", response);
    let res = {
      status: response.data.status,
      description: response.data.description,
      data: response.data.body,
    };
    return res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { BASE_URL };
export default instance;
