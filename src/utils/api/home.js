/**
 * 首页接口请求
 */
import instance from "../axios";

// 获取轮播图
export const getSwiper = () => {
  return instance.get("/home/swiper");
};

// 获取租房小组
export const getGroup = (area = "AREA%7C88cff55c-aaa4-e2e0") => {
  return instance.get(`/home/groups?area=${area}`);
};

// 获取新闻
export const getNews = (area = "AREA|88cff55c-aaa4-e2e0") => {
  return instance.get(`/home/news?area=${area}`);
};
