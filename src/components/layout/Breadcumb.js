import React from "react";

export default function Breadcumb() {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item">Home</li>
      <li className="breadcrumb-item">
        <a href="#">Admin</a>
      </li>
      <li className="breadcrumb-item active">Dashboard</li>

      <li className="breadcrumb-menu d-md-down-none">
        <div className="btn-group" role="group" aria-label="Button group">
          <a className="btn" href="#">
            <i className="icon-speech" />
          </a>
          <a className="btn" href="./">
            <i className="icon-graph" /> &nbsp;Dashboard
          </a>
          <a className="btn" href="#">
            <i className="icon-settings" /> &nbsp;Settings
          </a>
        </div>
      </li>
    </ol>
  );
}
