import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="main.html">
                <i className="nav-icon icon-speedometer" /> Dashboard
                <span className="badge badge-info">NEW</span>
              </a>
            </li>

            <li className="nav-title">Components</li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#">
                <i className="nav-icon icon-puzzle" /> Base
              </a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <a className="nav-link" href="base/breadcrumb.html">
                    <i className="nav-icon icon-puzzle" /> Breadcrumb
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <button className="sidebar-minimizer brand-minimizer" type="button" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Sidebar));
