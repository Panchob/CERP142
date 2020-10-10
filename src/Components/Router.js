import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import {SameStatus } from "./SameStatus";


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/status" component={SameStatus} />
    </Switch>
  </BrowserRouter>
);

export default Router