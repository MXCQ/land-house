import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom'

import Index from '../Index'
import House from '../House'
import Profile from '../Profile'

class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <Link to="/home">首页</Link>
        <Link to="/home/house">房屋列表</Link>
        <Link to="/home/profile">个人中心</Link>
        {/* 配置二级路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
      </div>
    );
  }
}

export default Home;