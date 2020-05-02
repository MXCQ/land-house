import React, { Component } from "react";

import FilterFooter from "../../../../components/FilterFooter";

import styles from "./index.module.css";

export default class FilterMore extends Component {
  // 设置选中值状态
  state = {
    selected: this.props.value,
  };

  // 获取选中数据
  handlerSel = (val) => {
    const { selected } = this.state;
    const newSelected = [...selected];
    // 没有改值，新增(高亮显示)
    let index = newSelected.indexOf(val);
    if (index < 0) {
      newSelected.push(val);
    } else {
      // 有，删除(取消高亮)
      newSelected.splice(index, 1);
    }
    console.log(newSelected);
    this.setState({
      selected: newSelected,
    });
  };

  // 渲染标签
  renderFilters(data) {
    const { selected } = this.state;
    // 高亮类名： styles.tagActive
    return data.map((item) => (
      <span
        key={item.value}
        onClick={() => {
          this.handlerSel(item.value);
        }}
        className={[
          styles.tag,
          selected.includes(item.value) ? styles.tagActive : "",
        ].join(" ")}
      >
        {item.label}
      </span>
    ));
  }

  render() {
    const {
      data: { roomType, oriented, floor, characteristic },
      onOk,
      onCancel,
    } = this.props;
    console.log(roomType, oriented, floor, characteristic);
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div
          className={styles.mask}
          onClick={() => {
            onCancel();
          }}
        />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          onOk={onOk}
          onCancel={onCancel}
          className={styles.footer}
        />
      </div>
    );
  }
}
