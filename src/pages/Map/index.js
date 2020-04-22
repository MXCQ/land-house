import React, { PureComponent } from "react";
import {NavBar,Icon} from 'antd-mobile'

import "./index.scss";

class Map extends PureComponent {
  componentDidMount() {
    this.initMap();
  }

  initMap = () => {
    const { BMap } = window;
    console.log(BMap);

    var map = new BMap.Map("container");
    // 经纬度设置(天安门)
    var point = new BMap.Point(116.404, 39.915);
    // 设置地图缩放
    map.centerAndZoom(point, 15);
  };

  render() {
    return (
      <div className="mapBox">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          地图找房
        </NavBar>
        <div id="container"></div>
      </div>
    );
  }
}

export default Map;
