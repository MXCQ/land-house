import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { getCities, getHotCities } from "../../utils/api/city";
import { getCurryCity, setLocal, CURRY_CITY } from "../../utils";

// 按需导入react-virtualized
import { List, AutoSizer } from "react-virtualized";

import "./index.scss";

class CityList extends Component {
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
    const res1 = await getHotCities();
    // console.log(status, data);
    // console.log(res1);
    const { cityIndex, cityList } = this.formatCities(data);
    // 加入热门城市
    if (res1.status === 200) {
      cityIndex.unshift("hot");
      cityList["hot"] = res1.data;
    }
    // 获取当前城市
    const res2 = await getCurryCity();
    // console.log(res2);

    // 加入当前城市
    cityIndex.unshift("#");
    cityList["#"] = [JSON.parse(res2)];

    // cityIndex.map((item) => {
    //   console.log(item, cityList[item]);
    // });
    this.setState({
      cityIndex,
      cityList,
    });
    console.log(cityIndex, cityList);
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

  // 格式化城市索引字母
  formatLetter = (letter, first) => {
    switch (letter) {
      case "hot":
        return first ? "热" : "热门城市";
      case "#":
        return first ? "当" : "当前城市";
      default:
        return letter.toUpperCase();
    }
  };

  // 动态获取行高
  getRowHeight = ({ index }) => {
    const { cityIndex, cityList } = this.state;
    let letter = cityIndex[index];
    // title 高度 + 城市高度 * 城市个数
    return 36 + 50 * cityList[letter].length;
  };

  // 渲染列表项
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityIndex, cityList } = this.state;

    const letter = cityIndex[index];
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.formatLetter(letter)}</div>
        {cityList[letter].map((item) => (
          <div key={item.value} className="name">
            {item.label}
          </div>
        ))}
      </div>
    );
  };

  // 渲染右侧索引
  renderCityIndex = () => {
    const { cityIndex } = this.state;
    return cityIndex.map((item, index) => {
      return (
        <li key={item} className="city-index-item">
          <span className={0 === index ? "index-active" : ""}>
            {this.formatLetter(item, true)}
          </span>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="cityList">
        {/* 顶部导航 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>
        {/* 列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
        {/* 右侧索引 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    );
  }
}

export default CityList;
