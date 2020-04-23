import React, { PureComponent } from "react";
import { Link, Route } from "react-router-dom";
import "./index.scss";

import { TabBar } from "antd-mobile";
import tabBars from "../../utils/tabbarConfig";

import Index from "../Index";
import House from "../House";
import Profile from "../Profile";

class Home extends PureComponent {
  state = {
    selectedTab: this.props.location.pathname,
  };

  componentDidMount() {
    this.props.history.listen((location) => {
      // console.log(location);
      if (location.pathname !== this.state.selectedTab) {
        this.setState({
          selectedTab: location.pathname,
        });
      }
    });
  }

  // tab栏组件
  renderTabBarItems = () => {
    return tabBars.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.path}
        icon={<i className={"iconfont " + item.icon} />}
        selectedIcon={<i className={"iconfont " + item.icon} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.props.history.push(item.path);
          // this.setState({
          //   selectedTab: item.path,
          // });
        }}
      />
    ));
  };
  render() {
    return (
      <div>
        {/* <Link to="/home/index">首页</Link>
        <Link to="/home/house">找房</Link>
        <Link to="/home/profile">我的</Link> */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
        <div className="barBox">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            noRenderContent={true}
          >
            {this.renderTabBarItems()}
          </TabBar>
        </div>
      </div>
    );
  }
}

export default Home;
