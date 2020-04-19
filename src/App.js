import React from 'react';
// 导入antd-mobile组件库
import { Button } from 'antd-mobile'

import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom';

import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import Fn404 from './pages/Fn404'
// 根组件
function App() {
  return (
    <Router>
      <div className="app">
        <Link to="/home">Home</Link>
        <Link to="/cityList">CityList</Link>
        <Link to="/map">Map</Link>
        <Switch>
          {/* 路由重定向 */}
          <Redirect exact from="/" to="/home" />
          {/* 一级路由 */}
          <Route path="/home" component={Home} />
          <Route path="/cityList" component={CityList} />
          <Route path="/map" component={Map} />

          {/* 404页面 */}
          <Route component={Fn404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
