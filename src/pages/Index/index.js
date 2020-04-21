import React, { PureComponent } from "react";

import { Carousel, Flex } from "antd-mobile";

import instance, { BASE_URL } from "../../utils/axios";
import { getSwiper, getGroup, getNews } from "../../utils/api/home";

import "./index.css";
import Navs from "../../utils/homeNav";

class Index extends PureComponent {
  state = {
    swiper: [],
    group: [],
    news: [],
    imgHeight: 234,
    aplay: false,
    keyword: "",
    currCity: {
      label: "--",
      value: "",
    },
  };

  componentDidMount() {
    this.loadDatas();
  }

  // // 获取轮播图
  // getSwiper = async () => {
  //   const { status, data } = await instance.get("/home/swiper");
  //   console.log(data);
  //   if (status === 200) {
  //     this.setState({
  //       swiper: data,
  //     });
  //   }
  //   console.log(this.swiper);
  // };

  // 获取初始化数据
  loadDatas = async () => {
    const apis = [getSwiper()];
    let res = await Promise.all(apis);
    console.log(res);
    this.setState(
      {
        swiper: res[0].data,
      },
      () => {
        this.setState({
          aplay: true,
        });
      }
    );
  };

  // 渲染轮播图
  renderCarousel = () => {
    return this.state.swiper.map((val) => (
      <a
        key={val.id}
        href="http://www.itheima.com"
        style={{
          display: "inline-block",
          width: "100%",
          height: this.state.imgHeight,
          background: "#fff",
        }}
      >
        <img
          src={`${BASE_URL}${val.imgSrc}`}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
          onLoad={() => {
            // 屏幕适配
            // fire window resize event to change height
            window.dispatchEvent(new Event("resize"));
            this.setState({ imgHeight: "auto" });
          }}
        />
      </a>
    ));
  };

  // 渲染导航栏
  renderFlex = () => {
    return Navs.map((item) => (
      <Flex.Item key={item.id} onClick={() => {
        this.props.history.push(item.path)
      }}>
        <img src={item.img} />
        <p>{item.title}</p>
      </Flex.Item>
    ));
  };

  render() {
    return (
      <div>
        {/* 轮播 */}
        <Carousel autoplay={this.state.aplay} infinite>
          {this.renderCarousel()}
        </Carousel>

        {/* 导航栏 */}
        <Flex className="nav">
          {this.renderFlex()}
        </Flex>
      </div>
    );
  }
}

export default Index;
