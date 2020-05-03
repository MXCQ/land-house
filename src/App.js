import React from "react";
// 导入antd-mobile组件库
// import { Button } from 'antd-mobile'

// import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom';
// GitHub部署修改hash
import {
  HashRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import HouseDetail from "./components/HouseDetail";
import Home from "./pages/Home";
import CityList from "./pages/CityList";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Fn404 from "./pages/Fn404";

import Rent from "./pages/Rent";
import RentAdd from "./pages/Rent/Add";
import RentSearch from "./pages/Rent/Search";

// 根组件
function App() {
  return (
    <Router>
      <div className="app">
        {/* <Link to="/home">Home</Link>
        <Link to="/cityList">CityList</Link>
        <Link to="/map">Map</Link> */}
        <Switch>
          {/* 路由重定向 */}
          <Redirect exact from="/" to="/home" />
          {/* 一级路由 */}
          <Route path="/home" component={Home} />
          <Route path="/cityList" component={CityList} />
          <Route path="/map" component={Map} />
          <Route path="/login" component={Login} />

          {/* 房屋 */}
          <Route path="/detail/:id" component={HouseDetail} />

          {/* 房源管理 */}
          <Route path="/rent" exact component={Rent} />
          <Route path="/rent/add" component={RentAdd} />
          <Route path="/rent/search" component={RentSearch} />
          {/* <AuthRoute path="/rent" exact component={Rent} />
            <AuthRoute path="/rent/add" component={RentAdd} />
            <AuthRoute path="/rent/search" component={RentSearch} /> */}
          {/* 404页面 */}
          <Route component={Fn404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
