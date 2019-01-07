import React from "react";

export default function Asidebar() {
  return (
    <div>
      <aside className="aside-menu">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#timeline"
              role="tab"
            >
              <i className="icon-list" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#messages"
              role="tab"
            >
              <i className="icon-speech" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#settings"
              role="tab"
            >
              <i className="icon-settings" />
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="timeline" role="tabpanel">
            <div className="list-group list-group-accent">
              <div className="list-group-item list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
                Today
              </div>
              <div className="list-group-item list-group-item-accent-warning list-group-item-divider">
                <div className="avatar float-right">
                  <img
                    className="img-avatar"
                    src="img/avatars/7.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                </div>
                <div>
                  Meeting with
                  <strong>Lucas</strong>
                </div>
                <small className="text-muted mr-3">
                  <i className="icon-calendar" />
                  &nbsp; 1 - 3pm
                </small>
                <small className="text-muted">
                  <i className="icon-location-pin" />
                  &nbsp; Palo Alto, CA
                </small>
              </div>
              <div className="list-group-item list-group-item-accent-info">
                <div className="avatar float-right">
                  <img
                    className="img-avatar"
                    src="img/avatars/4.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                </div>
                <div>
                  Skype with
                  <strong>Megan</strong>
                </div>
                <small className="text-muted mr-3">
                  <i className="icon-calendar" />
                  &nbsp; 4 - 5pm
                </small>
                <small className="text-muted">
                  <i className="icon-social-skype" />
                  &nbsp; On-line
                </small>
              </div>
              <div className="list-group-item list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
                Tomorrow
              </div>
              <div className="list-group-item list-group-item-accent-danger list-group-item-divider">
                <div>
                  New UI Project -<strong>deadline</strong>
                </div>
                <small className="text-muted mr-3">
                  <i className="icon-calendar" />
                  &nbsp; 10 - 11pm
                </small>
                <small className="text-muted">
                  <i className="icon-home" />
                  &nbsp; creativeLabs HQ
                </small>
                <div className="avatars-stack mt-2">
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/2.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/3.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/4.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/5.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/6.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                </div>
              </div>
              <div className="list-group-item list-group-item-accent-success list-group-item-divider">
                <div>
                  <strong>#10 Startups.Garden</strong> Meetup
                </div>
                <small className="text-muted mr-3">
                  <i className="icon-calendar" />
                  &nbsp; 1 - 3pm
                </small>
                <small className="text-muted">
                  <i className="icon-location-pin" />
                  &nbsp; Palo Alto, CA
                </small>
              </div>
              <div className="list-group-item list-group-item-accent-primary list-group-item-divider">
                <div>
                  <strong>Team meeting</strong>
                </div>
                <small className="text-muted mr-3">
                  <i className="icon-calendar" />
                  &nbsp; 4 - 6pm
                </small>
                <small className="text-muted">
                  <i className="icon-home" />
                  &nbsp; creativeLabs HQ
                </small>
                <div className="avatars-stack mt-2">
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/2.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/3.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/4.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/5.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/6.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/7.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="avatar avatar-xs">
                    <img
                      className="img-avatar"
                      src="img/avatars/8.jpg"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane p-3" id="messages" role="tabpanel">
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img
                    className="img-avatar"
                    src="img/avatars/7.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                  <span className="avatar-status badge-success" />
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">
                Lorem ipsum dolor sit amet
              </div>
              <small className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt...
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img
                    className="img-avatar"
                    src="img/avatars/7.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                  <span className="avatar-status badge-success" />
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">
                Lorem ipsum dolor sit amet
              </div>
              <small className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt...
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img
                    className="img-avatar"
                    src="img/avatars/7.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                  <span className="avatar-status badge-success" />
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">
                Lorem ipsum dolor sit amet
              </div>
              <small className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt...
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img
                    className="img-avatar"
                    src="img/avatars/7.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                  <span className="avatar-status badge-success" />
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">
                Lorem ipsum dolor sit amet
              </div>
              <small className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt...
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img
                    className="img-avatar"
                    src="img/avatars/7.jpg"
                    alt="admin@bootstrapmaster.com"
                  />
                  <span className="avatar-status badge-success" />
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">
                Lorem ipsum dolor sit amet
              </div>
              <small className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt...
              </small>
            </div>
          </div>
          <div className="tab-pane p-3" id="settings" role="tabpanel">
            <h6>Settings</h6>
            <div className="aside-options">
              <div className="clearfix mt-4">
                <small>
                  <b>Option 1</b>
                </small>
                <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                  <input className="switch-input" type="checkbox" />
                  <span
                    className="switch-slider"
                    data-checked="On"
                    data-unchecked="Off"
                  />
                </label>
              </div>
              <div>
                <small className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </small>
              </div>
            </div>
            <div className="aside-options">
              <div className="clearfix mt-3">
                <small>
                  <b>Option 2</b>
                </small>
                <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                  <input className="switch-input" type="checkbox" />
                  <span
                    className="switch-slider"
                    data-checked="On"
                    data-unchecked="Off"
                  />
                </label>
              </div>
              <div>
                <small className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </small>
              </div>
            </div>
            <div className="aside-options">
              <div className="clearfix mt-3">
                <small>
                  <b>Option 3</b>
                </small>
                <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                  <input className="switch-input" type="checkbox" />
                  <span
                    className="switch-slider"
                    data-checked="On"
                    data-unchecked="Off"
                  />
                </label>
              </div>
            </div>
            <div className="aside-options">
              <div className="clearfix mt-3">
                <small>
                  <b>Option 4</b>
                </small>
                <label className="switch switch-label switch-pill switch-success switch-sm float-right">
                  <input className="switch-input" type="checkbox" />
                  <span
                    className="switch-slider"
                    data-checked="On"
                    data-unchecked="Off"
                  />
                </label>
              </div>
            </div>
            <hr />
            <h6>System Utilization</h6>
            <div className="text-uppercase mb-1 mt-4">
              <small>
                <b>CPU Usage</b>
              </small>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <small className="text-muted">348 Processes. 1/4 Cores.</small>
            <div className="text-uppercase mb-1 mt-2">
              <small>
                <b>Memory Usage</b>
              </small>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: "70%" }}
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <small className="text-muted">11444GB/16384MB</small>
            <div className="text-uppercase mb-1 mt-2">
              <small>
                <b>SSD 1 Usage</b>
              </small>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: "95%" }}
                aria-valuenow="95"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <small className="text-muted">243GB/256GB</small>
            <div className="text-uppercase mb-1 mt-2">
              <small>
                <b>SSD 2 Usage</b>
              </small>
            </div>
            <div className="progress progress-xs">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "10%" }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <small className="text-muted">25GB/256GB</small>
          </div>
        </div>
      </aside>
    </div>
  );
}
