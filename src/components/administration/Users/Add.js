import React, { Component } from "react";
import { connect } from "react-redux";

import classnames from "classnames";

import Spinner from "../../common/Spinner";
import { addUser } from "../../../actions/UsersAction";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      modalLoading: false,
      succMsg: "",
      errors: {}
    };
  }

  componentDidMount() {
    // $("#Modal").modal("show");
  }

  componentWillReceiveProps = nextProps => {
    // code here
    this.setState({ modalLoading: nextProps.users.modalLoading });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.users.successMsg)
      this.setState({
        name: "",
        email: "",
        password: "",
        succMsg: nextProps.users.successMsg
      });
  };

  // april 6-18

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onCloseModal = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
      modalLoading: false
    });
    this.props.onModalClose();
  };

  onModalSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { addUser } = this.props;

    const data = { name, email, password };

    this.setState({
      modalLoading: true,
      succMsg: ""
    });

    addUser(data);
  };

  render() {
    const { name, email, password, modalLoading, errors, succMsg } = this.state;

    return (
      <form onSubmit={this.onModalSubmit} method="POST">
        <div className="modal-body">
          <div className="form-group row">
            <label
              className="col-md-3 col-form-label text-right"
              htmlFor="name"
            />
            <div className="col-md-9">
              <h4 style={{ color: "#63c2de" }}>Add new user</h4>
              {succMsg && (
                <div>
                  <br />
                  <h5 style={{ color: "#4dbd74" }}>{succMsg}</h5>
                </div>
              )}
            </div>
          </div>

          {modalLoading == true ? (
            <Spinner />
          ) : (
            <div>
              <div className="form-group row">
                <label
                  className="col-md-3 col-form-label text-right"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="col-md-9">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.name,
                      "is-valid": succMsg
                    })}
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-md-3 col-form-label text-right"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="col-md-9">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.email,
                      "is-valid": succMsg
                    })}
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label
                  className="col-md-3 col-form-label text-right"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="col-md-9">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.password,
                      "is-valid": succMsg
                    })}
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={modalLoading ? "disabled" : ""}
          >
            {modalLoading ? "Adding..." : "Add User"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={this.onCloseModal}
          >
            Close
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addUser }
)(Add);
