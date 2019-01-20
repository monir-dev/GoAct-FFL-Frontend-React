import React, { Component } from "react";
import { connect } from "react-redux";

import classnames from "classnames";

import Spinner from "../../common/Spinner";
import { addRole } from "../../../actions/RolesAction";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      display_name: "",
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
    this.setState({ modalLoading: nextProps.roles.modalLoading });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.roles.successMsg)
      this.setState({
        name: "",
        display_name: "",
        succMsg: nextProps.roles.successMsg
      });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onCloseModal = () => {
    this.setState({
      name: "",
      display_name: "",
      modalLoading: false
    });
    this.props.onModalClose();
  };

  onModalSubmit = e => {
    e.preventDefault();

    const { name, display_name } = this.state;
    const { addRole } = this.props;

    const data = { name, display_name };

    this.setState({
      modalLoading: true,
      succMsg: ""
    });

    addRole(data);
  };

  render() {
    const { name, display_name, modalLoading, errors, succMsg } = this.state;

    return (
      <form onSubmit={this.onModalSubmit} method="POST">
        <div className="modal-body">
          <div className="form-group row">
            <label
              className="col-md-3 col-form-label text-right"
              htmlFor="name"
            />
            <div className="col-md-9">
              <h4 style={{ color: "#63c2de" }}>Add new role</h4>
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
                  htmlFor="display_name"
                >
                  Display Name
                </label>
                <div className="col-md-9">
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.display_name,
                      "is-valid": succMsg
                    })}
                    id="display_name"
                    type="text"
                    name="display_name"
                    value={display_name}
                    onChange={this.onChange}
                  />
                  {errors.display_name && (
                    <div className="invalid-feedback">
                      {errors.display_name}
                    </div>
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
            {modalLoading ? "Adding..." : "Add Role"}
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
  roles: state.roles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addRole }
)(Add);
