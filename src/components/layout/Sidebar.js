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
              <Link className="nav-link" to="/dashboard">
                <i className="nav-icon icon-speedometer" /> Dashboard
                <span className="badge badge-info">NEW</span>
              </Link>
            </li>

            <li className="nav-title">Administration</li>
            <li className="nav-item nav-dropdown">
              <Link className="nav-link nav-dropdown-toggle" to="">
                <i className="nav-icon icon-puzzle" /> Administration
              </Link>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="nav-icon icon-puzzle" /> Users
                  </Link>
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
