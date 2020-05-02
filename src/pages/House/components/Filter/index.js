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

// 选中数据维护(测试)
const selectedValues = {
  area: ["area", "null"],
  // area: ['area', 'AREA|69cc5f6d-4f29-a77c', 'AREA|73aa1890-64c7-51d9'],
  mode: ["null"],
  // mode: ['true'],
  price: ["null"],
  // price: ['PRICE|1000'],
  more: [],
};

export default class Filter extends Component {
  state = {
    titleSelectedStatus: { ...titleSelectedStatus },
    // 打开当前type状态
    openType: "",
  };

  componentDidMount() {
    // 初始化：存储到实例属性上
    this.selectedValues = { ...selectedValues };
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

  // 关闭前三个筛选器内容和遮罩层  取消后
  onCancel = () => {
    let newSel = this.handlerSel();
    // console.log(newSel);
    this.setState({
      openType: "",
      titleSelectedStatus: newSel,
    });
  };

  // 处理筛选器选中后有无条件的高亮状态
  handlerSel = () => {
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = {};
    // 遍历selectedValue
    Object.keys(this.selectedValues).forEach((key) => {
      let cur = this.selectedValues[key];
      if (key === "area" && (cur[1] !== "null" || cur[0] === "subway")) {
        newTitleSelectedStatus[key] = true;
      } else if (key === "mode" && cur[0] !== "null") {
        newTitleSelectedStatus[key] = true;
      } else if (key === "price" && cur[0] !== "null") {
        newTitleSelectedStatus[key] = true;
      } else if (key === "more" && cur.length !== 0) {
        // 更多选择项 FilterMore 组件情况
        newTitleSelectedStatus[key] = true;
      } else {
        newTitleSelectedStatus[key] = false;
      }
    });
    return newTitleSelectedStatus;
  };

  // 处理后台需要的筛选条件数据
  handlerFilters = (selectedValues) => {
    // 筛选条件数据
    const { area, mode, price, more } = selectedValues;
    // 组装数据
    const filters = {};
    // area | subway
    let areaKey = area[0],
      aval;
    if (area.length === 2) {
      aval = area[1];
    } else {
      if (area[2] !== "null") {
        aval = area[2];
      } else {
        aval = area[1];
      }
    }
    filters[areaKey] = aval;
    // mode
    filters.rentType = mode[0];
    // price
    filters.price = price[0];
    // more
    filters.more = more.join(",");
    console.log(filters);
    return filters;
  };

  // 确定选择过滤条件
  onOk = (sel) => {
    // console.log(sel);
    const { openType } = this.state;
    // 存储当前选中筛选数据
    this.selectedValues[openType] = sel;
    // 处理高亮
    let newSel = this.handlerSel();
    // console.log(newSel);
    this.setState(
      {
        openType: "",
        titleSelectedStatus: newSel,
      },
      () => {
        // 处理筛选条件数据
        this.props.onFilter(this.handlerFilters(this.selectedValues));
      }
    );
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
          key={openType}
          data={data}
          // 传递当前选中的筛选数据
          value={this.selectedValues[openType]}
          cols={cols}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      );
    } else {
      return null;
    }
  };

  // 最后一个条件渲染
  renderFilterMore = () => {
    const { openType } = this.state;
    if (openType === "more") {
      // console.log(this.filterData);
      // 传递筛选器数据
      const { roomType, oriented, floor, characteristic } = this.filterData;
      const data = { roomType, oriented, floor, characteristic };
      return (
        <FilterMore
          data={data}
          value={this.selectedValues[openType]}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      );
    }
    return null;
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
          {this.renderFilterMore()}
        </div>
      </div>
    );
  }
}
