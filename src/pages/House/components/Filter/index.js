import React, { Component } from "react";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

import styles from "./index.module.css";
import { getHouseFilter } from "../../../../utils/api/house";
import { getCurryCity } from "../../../../utils/index";

const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
};

export default class Filter extends Component {
  state = {
    titleSelectedStatus: { ...titleSelectedStatus },
    // 打开当前type状态
    openType: "",
  };

  componentDidMount() {
    this.getFilterData();
  }

  onTitleClick = (type) => {
    // console.log(type);
    this.setState({
      titleSelectedStatus: { ...titleSelectedStatus, [type]: true },
      openType: type,
    });
  };

  // 获取过滤条件
  getFilterData = async () => {
    const { value } = await getCurryCity();
    // console.log(value);

    // 保存城市id
    this.ciyId = value;
    const res = await getHouseFilter(value);
    // console.log(res);

    res.status === 200 && (this.filterData = res.data);
  };

  // 关闭前三个筛选器内容和遮罩层
  onCancel = () => {
    this.setState({
      openType: "",
    });
  };

  // 确定选择过滤条件
  onOk = () => {
    this.setState({
      openType: "",
    });
  };

  isShow = () => {
    const { openType } = this.state;
    return openType === "area" || openType === "mode" || openType === "price";
  };

  // 前三个菜单对应内容渲染
  renderFilterPicker = () => {
    if (this.isShow()) {
      // 获取当前筛选类型
      const { openType } = this.state;
      // 获取筛选条件
      const { area, subway, rentType, price } = this.filterData;
      let data,
        cols = 1; // col是控制PickerView的列数

      switch (openType) {
        case "area":
          data = [area, subway];
          cols = 3;
          break;
        case "mode":
          data = rentType;
          cols = 1;
          break;
        case "price":
          data = price;
          cols = 1;
          break;
        default:
          break;
      }

      return (
        <FilterPicker
          data={data}
          cols={cols}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.isShow() ? <div className={styles.mask} /> : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={this.state.titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {/* {this.isShow() ? (
            <FilterPicker onCancel={this.onCancel} onOk={this.onOk} />
          ) : null} */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    );
  }
}
