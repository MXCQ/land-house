/**
 * 找房
 */
import instance from "../axios";

// 获取当前城市信息
export const getHouseFilter = (id = "AREA|88cff55c-aaa4-e2e0") => {
  return instance.get(`/houses/condition?id=${id}`);
};

// 根据筛选条件获取房屋列表
export const getHouseByFilters = (cityId, params, statrt, end) => {
  return instance.get(`/houses`, {
    params: {
      cityId,
      ...params,
      statrt,
      end
    }
  })
}

// 获取房屋详情
export const getHouseDetail = (id) => {
  return instance.get(`/houses/${id}`)
}

// 获取房屋是否收藏过
export const getHouseFav = (id) => {
  return instance.get(`/user/favorites/${id}`)
}

// 添加收藏
export const addFav = (id) => {
  return instance.post(`/user/favorites/${id}`)
}

// 删除收藏
export const delFav = (id) => {
  return instance.delete(`/user/favorites/${id}`)
}