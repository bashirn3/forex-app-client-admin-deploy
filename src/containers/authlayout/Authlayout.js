import React from 'react';
import { Route, Switch } from 'react-router-dom';
import  './Authlayout.css'
import Login from '../login/Login';

function Authlayout() {
    return (
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
    )
}

export default Authlayout