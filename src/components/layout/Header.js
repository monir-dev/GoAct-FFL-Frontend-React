import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";

class Header extends Component {
  logout = e => {
    e.preventDefault();
    this.props.history.go("/login");
    this.props.logoutUser();
  };

  render() {
    return (
      <header className="app-header navbar" style={{ top: 0 }}>
        <button
          className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
          type="button"
          data-toggle="sidebar-show"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#">
          <img
            className="navbar-brand-full"
            src="https://coreui.io/demo/dark/img/brand/logo.svg"
            width="89"
            height="25"
            alt="CoreUI Logo"
          />
          <img
            className="navbar-brand-minimized"
            src="https://coreui.io/demo/dark/img/brand/sygnet.svg"
            width="30"
            height="30"
            alt="CoreUI Logo"
          />
        </a>
        <button
          className="navbar-toggler sidebar-toggler d-md-down-none"
          type="button"
          data-toggle="sidebar-lg-show"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item px-3">
            <a className="nav-link" href="#">
              Dashboard
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#">
              Users
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#">
              Settings
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item dropdown d-md-down-none">
            <a
              className="nav-link"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="icon-bell" />
              <span className="badge badge-pill badge-danger">5</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg">
              <div className="dropdown-header text-center">
                <strong>You have 5 notifications</strong>
              </div>
              <a className="dropdown-item" href="#">
                <i className="icon-user-follow text-success" /> New user
                registered
              </a>
              <a className="dropdown-item" href="#">
                <i className="icon-user-unfollow text-danger" /> User deleted
              </a>
              <a className="dropdown-item" href="#">
                <i className="icon-chart text-info" /> Sales report is ready
              </a>
              <a className="dropdown-item" href="#">
                <i className="icon-basket-loaded text-primary" /> New client
              </a>
              <a className="dropdown-item" href="#">
                <i className="icon-speedometer text-warning" /> Server
                overloaded
              </a>
              <div className="dropdown-header text-center">
                <strong>Server</strong>
              </div>
              <a className="dropdown-item" href="#">
                <div className="text-uppercase mb-1">
                  <small>
                    <b>CPU Usage</b>
                  </small>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
                <small className="text-muted">348 Processes. 1/4 Cores.</small>
              </a>
              <a className="dropdown-item" href="#">
                <div className="text-uppercase mb-1">
                  <small>
                    <b>Memory Usage</b>
                  </small>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "70%" }}
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
                <small className="text-muted">11444GB/16384MB</small>
              </a>
              <a className="dropdown-item" href="#">
                <div className="text-uppercase mb-1">
                  <small>
                    <b>SSD 1 Usage</b>
                  </small>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "95%" }}
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
                <small className="text-muted">243GB/256GB</small>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown d-md-down-none">
            <a
              className="nav-link"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="icon-list" />
              <span className="badge badge-pill badge-warning">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg">
              <div className="dropdown-header text-center">
                <strong>You have 5 pending tasks</strong>
              </div>
              <a className="dropdown-item" href="#">
                <div className="small mb-1">
                  Upgrade NPM &amp; Bower
                  <span className="float-right">
                    <strong>0%</strong>
                  </span>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "0%" }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
              </a>
              <a className="dropdown-item" href="#">
                <div className="small mb-1">
                  ReactJS Version
                  <span className="float-right">
                    <strong>25%</strong>
                  </span>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
              </a>
              <a className="dropdown-item" href="#">
                <div className="small mb-1">
                  VueJS Version
                  <span className="float-right">
                    <strong>50%</strong>
                  </span>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
              </a>
              <a className="dropdown-item" href="#">
                <div className="small mb-1">
                  Add new layouts
                  <span className="float-right">
                    <strong>75%</strong>
                  </span>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
              </a>
              <a className="dropdown-item" href="#">
                <div className="small mb-1">
                  Angular 2 Cli Version
                  <span className="float-right">
                    <strong>100%</strong>
                  </span>
                </div>
                <span className="progress progress-xs">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </span>
              </a>
              <a className="dropdown-item text-center" href="#">
                <strong>View all tasks</strong>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown d-md-down-none">
            <a
              className="nav-link"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="icon-envelope-letter" />
              <span className="badge badge-pill badge-info">7</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg">
              <div className="dropdown-header text-center">
                <strong>You have 4 messages</strong>
              </div>
              <a className="dropdown-item" href="#">
                <div className="message">
                  <div className="py-3 mr-3 float-left">
                    <div className="avatar">
                      <img
                        className="img-avatar"
                        src="https://coreui.io/demo/dark/img/avatars/4.jpg"
                        alt="admin@bootstrapmaster.com"
                      />
                      <span className="avatar-status badge-success" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">John Doe</small>
                    <small className="text-muted float-right mt-1">
                      Just now
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger" /> Important
                    message
                  </div>
                  <div className="small text-muted text-truncate">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt...
                  </div>
                </div>
              </a>
              <a className="dropdown-item" href="#">
                <div className="message">
                  <div className="py-3 mr-3 float-left">
                    <div className="avatar">
                      <img
                        className="img-avatar"
                        src="https://coreui.io/demo/dark/img/avatars/4.jpg"
                        alt="admin@bootstrapmaster.com"
                      />
                      <span className="avatar-status badge-warning" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">John Doe</small>
                    <small className="text-muted float-right mt-1">
                      5 minutes ago
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    Lorem ipsum dolor sit amet
                  </div>
                  <div className="small text-muted text-truncate">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt...
                  </div>
                </div>
              </a>
              <a className="dropdown-item" href="#">
                <div className="message">
                  <div className="py-3 mr-3 float-left">
                    <div className="avatar">
                      <img
                        className="img-avatar"
                        src="https://coreui.io/demo/dark/img/avatars/4.jpg"
                        alt="admin@bootstrapmaster.com"
                      />
                      <span className="avatar-status badge-danger" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">John Doe</small>
                    <small className="text-muted float-right mt-1">
                      1:52 PM
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    Lorem ipsum dolor sit amet
                  </div>
                  <div className="small text-muted text-truncate">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt...
                  </div>
                </div>
              </a>
              <a className="dropdown-item" href="#">
                <div className="message">
                  <div className="py-3 mr-3 float-left">
                    <div className="avatar">
                      <img
                        className="img-avatar"
                        src="https://coreui.io/demo/dark/img/avatars/4.jpg"
                        alt="admin@bootstrapmaster.com"
                      />
                      <span className="avatar-status badge-info" />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">John Doe</small>
                    <small className="text-muted float-right mt-1">
                      4:03 PM
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    Lorem ipsum dolor sit amet
                  </div>
                  <div className="small text-muted text-truncate">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt...
                  </div>
                </div>
              </a>
              <a className="dropdown-item text-center" href="#">
                <strong>View all messages</strong>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link nav-link"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="img-avatar"
                src="https://coreui.io/demo/dark/img/avatars/4.jpg"
                alt="admin@bootstrapmaster.com"
              />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-header text-center">
                <strong>Account</strong>
              </div>
              <a className="dropdown-item" href="#">
                <i className="fa fa-bell-o" /> Updates
                <span className="badge badge-info">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-envelope-o" /> Messages
                <span className="badge badge-success">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-tasks" /> Tasks
                <span className="badge badge-danger">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-comments" /> Comments
                <span className="badge badge-warning">42</span>
              </a>
              <div className="dropdown-header text-center">
                <strong>Settings</strong>
              </div>
              <a className="dropdown-item" href="#">
                <i className="fa fa-user" /> Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-wrench" /> Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-usd" /> Payments
                <span className="badge badge-dark">42</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="fa fa-file" /> Projects
                <span className="badge badge-primary">42</span>
              </a>
              <div className="divider" />
              <a className="dropdown-item" href="#">
                <i className="fa fa-shield" /> Lock Account
              </a>
              <a className="dropdown-item" href="#" onClick={this.logout}>
                <i className="fa fa-lock" /> Logout
              </a>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler aside-menu-toggler d-md-down-none"
          type="button"
          data-toggle="aside-menu-lg-show"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <button
          className="navbar-toggler aside-menu-toggler d-lg-none"
          type="button"
          data-toggle="aside-menu-show"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
