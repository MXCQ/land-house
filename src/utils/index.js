/**
 * 全局公共方法
 */
import { getCityInfo } from "./api/city";

export const getLocal = (key) => {
  return window.localStorage.getItem(key)
}
export const setLocal = (key, val) => {
  window.localStorage.setItem(key, val)
}
export const removeLocal = (key) => {
  window.localStorage.removeItem(key)
}

const getCityName = async () => {
  return new Promise((resolve, reject) => {
    let myCity = new window.BMap.LocalCity();
    myCity.get((res) => {
      resolve(res.name);
    });
  });
};

// 城市信息数据
export const CURRY_CITY = "curry_city";
export const getCurryCity = () => {
  let curCity = localStorage.getItem(CURRY_CITY);
  if (!curCity) {
    // 如果没有（第一次定位）
    return new Promise(async (resolve, reject) => {
      const cityName = await getCityName();
      // // 根据IP定位当前城市localCity数据
      // let myCity = new window.BMap.LocalCity();
      // // 调用接口获取城市详细信息
      // myCity.get(async (result) => {
      const { status, data } = await getCityInfo(cityName);
      if (status === 200) {
        localStorage.setItem(CURRY_CITY, JSON.stringify(data));
        resolve(JSON.stringify(data));
      } else {
        reject("error");
      }
      // });
    });
  } else {
    // 如果有
    return Promise.resolve(curCity);
  }
};
