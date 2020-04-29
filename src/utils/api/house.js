/**
 * 找房
 */
import instance from "../axios";

// 获取当前城市信息
export const getHouseFilter = (id = "AREA|88cff55c-aaa4-e2e0") => {
  return instance.get(`/houses/condition?id=${id}`);
};
