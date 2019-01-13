import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";

import store from "./Store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AdminFooter from "./components/layout/AdminFooter";
import Asidebar from "./components/layout/Asidebar";
import Breadcumb from "./components/layout/Breadcumb";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";

import NotFound from "./components/not-found/NotFound";

import Users from "./components/administration/Users";
import Roles from "./components/administration/Roles";

import "./App.css";
import _ from "lodash";

// check for token
if (localStorage.jwtToken && localStorage.jwtToken !== undefined) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info an exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // current user profile
    // redirect user to login page
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    const hasToken = localStorage.jwtToken;
    const guestRoutes = (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container" style={{ paddingBottom: "70px" }}>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/not-found" component={NotFound} />
        </div>
        <Footer />
      </div>
    );

    const AdminRoutes = (
      <div>
        <Header />
        <div className="app-body">
          <Sidebar />
          <div className="main">
            <Breadcumb />
            <div className="container-fluid">
              <div id="ui-view">
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/users" component={Users} />
                  <PrivateRoute exact path="/roles" component={Roles} />
                </Switch>
              </div>
            </div>
          </div>
          <Asidebar />
        </div>
        <AdminFooter />
      </div>
    );

    return (
      <Provider store={store}>
        <Router>{hasToken ? AdminRoutes : guestRoutes}</Router>
      </Provider>
    );
  }
}

export default App;
