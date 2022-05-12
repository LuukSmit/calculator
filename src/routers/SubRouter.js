/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import {
  HomeView,
} from 'C4';


const SubRouter = () => (
  <div className="subRouter" id="container">
    <div className="viewContainer">
      <Switch>
        <Route path="/calculator" exact component={HomeView} />
      </Switch>
    </div>
  </div>
);

export default withRouter(SubRouter);
