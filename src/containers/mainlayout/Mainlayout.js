import React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Classes from '../classes/Classes';
import Signals from '../signals/Signals';
import Users from '../users/Users';
import Topics from '../classes/Topics';
import TopicDetail from '../topicdetail/TopicDetail';
import SideBarOption from '../../components/SideBarOption/SideBarOption';
import { FaDollarSign } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { MdClass, MdPersonOutline} from 'react-icons/md';
import { BiPowerOff } from "react-icons/bi";

import './Mainlayout.css'
import Subscriptions from '../subscriptions/Subscriptions';


function Mainlayout() {
  const history = useHistory();

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('operator');
    history.push('/')
  }
  return (
    <div className="main-layout">
      <nav className="top-nav">
        <div className="logo-container">
          <div className="logo">
            <img src={logo} className="" alt="Leo logo" />
          </div>
        </div>
      </nav>
      <nav className="side-nav">
        <h3 className="dashboard-title">HOME</h3>
        <ul className="side-nav__items">


          <li key={1} className="side-nav__item">
            <Link to="/app/signals" className="nav_link" key={1}>
              <SideBarOption Icon={FaDollarSign} text="Signals" />
            </Link>
          </li>

          <li key={2} className="side-nav__item">
            <Link to="/app/users" className="nav_link" key={2}>
              <SideBarOption Icon={MdPersonOutline} text="Users" />
            </Link>
          </li>

          <li key={3} className="side-nav__item">
            <Link to="/app/classes" className="nav_link" key={3}>
              <SideBarOption Icon={MdClass} text="Classes" />
            </Link>
          </li>

          <li key={4} className="side-nav__item">
            <Link to="/app/subscriptions" className="nav_link" key={4}>
              <SideBarOption Icon={FiPackage} text="Subscriptions" />
            </Link>
          </li>

          <li onClick={handleLogout} key={5} className="side-nav__item">
            <Link className="nav_link" text="Logout" key={5}>

              <SideBarOption Icon={BiPowerOff} text="Logout" />
            </Link>
          </li>

        </ul>
      </nav>
      <div className="layout-body">
        <Switch>
          <Route path="/app/signals" exact component={Signals} />
          <Route path="/app/users" component={Users} />
          <Route path="/app/classes" exact component={Classes} />
          <Route path="/app/topics/:id" exact component={Topics} />
          <Route path="/app/classes/:id/topics/:topic_id" exact component={TopicDetail} />
          <Route path="/app/subscriptions" exact component={Subscriptions} />
        </Switch>
      </div>
    </div>
  )
}

export default Mainlayout