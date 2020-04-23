import React, { PureComponent } from "react";

import { getCities, getHotCities } from "../../utils/api/city";

class CityList extends PureComponent {
  state = {
    cityIndex: [],
    cityList: {},
  };

  componentDidMount() {
    this.getCityList();
  }

  getCityList = async () => {
    // 获取城市数据
    const { status, data } = await getCities();
    // 获取热门城市数据
    const res = await getHotCities();
    // console.log(status, data);
    // console.log(res);
    const { cityIndex, cityList } = this.formatCities(data);
    // 加入热门城市
    if (res.status === 200) {
      cityIndex.unshift("hot");
      cityList["hot"] = res.data;
    }

    cityIndex.map((item) => {
      console.log(item, cityList[item]);
    });
  };

  // 按城市首字母归类城市数据
  formatCities = (data) => {
    const cityList = {};
    // 遍历数据，然后归类
    data.forEach((item) => {
      // 获取当前城市首字母
      let fst = item.short.slice(0, 1);
      // 判断存不存在当前首字母开头的键
      if (!cityList[fst]) {
        // 不存在
        cityList[fst] = [item];
      } else {
        // 存在
        cityList[fst].push(item);
      }
    });
    // console.log("首字母归类完数据：", cityList); // 归类完成
    // 获取归类后的首字母数据
    const cityIndex = Object.keys(cityList).sort();
    // console.log(cityIndex);

    return {
      cityIndex,
      cityList,
    };
  };

  render() {
    return <h1>CityList</h1>;
  }
}

export default CityList;
