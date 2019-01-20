import React, { Component } from "react";
import { connect } from "react-redux";

import classnames from "classnames";

import Spinner from "../../common/Spinner";
import {
  assignRole,
  refreshStatusAndLoading
} from "../../../actions/UsersAction";
import { getRoles } from "../../../actions/RolesAction";

class AssignRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      roleId: "",
      roles: [],
      modalLoading: false,
      succMsg: "",
      errors: {}
    };
  }

  componentDidMount = () => {
    const { userId } = this.props;
    const user = this.props.users.users.filter(item => item.id == userId)[0];

    this.props.getRoles();

    this.setState({
      userId: userId,
      roleId: user.role_id
    });
  };

  componentWillReceiveProps = nextProps => {
    // code here
    this.setState({ modalLoading: nextProps.users.modalLoading });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.users.successMsg) {
      this.setState({
        succMsg: nextProps.users.successMsg
      });
    }

    if (!nextProps.errors && !nextProps.modalLoading) {
      this.onCloseModal();
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onCloseModal = () => {
    this.setState({
      modalLoading: false,
      succMsg: ""
    });
    this.props.refreshStatusAndLoading();
    this.props.onModalClose();
  };

  onModalSubmit = e => {
    e.preventDefault();

    const { userId, roleId } = this.state;
    const { assignRole } = this.props;
    const user = this.props.users.users.filter(item => item.id == userId)[0];

    this.setState({
      modalLoading: true,
      succMsg: ""
    });

    assignRole(roleId, user);
  };

  render() {
    const { modalLoading, succMsg, roleId } = this.state;
    return (
      <div>
        <form onSubmit={this.onModalSubmit} method="POST">
          <div className="modal-body">
            <div className="form-group row">
              <label
                className="col-md-3 col-form-label text-right"
                htmlFor="name"
              />
              <div className="col-md-9">
                <h4 style={{ color: "#63c2de" }}>Assign Role</h4>
                {succMsg && (
                  <div>
                    <br />
                    <h5 style={{ color: "#4dbd74" }}>{succMsg}</h5>
                  </div>
                )}
              </div>
            </div>

            {modalLoading === true ? (
              <Spinner />
            ) : (
              <div>
                <div className="form-group row">
                  <label
                    className="col-md-3 col-form-label text-right"
                    htmlFor="roleId"
                  >
                    Select Role
                  </label>
                  <div className="col-md-9">
                    <select
                      className={classnames("form-control", {
                        "is-valid": succMsg
                      })}
                      id="roleId"
                      name="roleId"
                      onChange={this.onChange}
                      value={roleId}
                    >
                      <option value="no_role">Please select</option>
                      {this.props.roles.roles.map(item => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.display_name}
                          </option>
                        );
                      })}
                    </select>
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
              {modalLoading ? "Updating..." : "Update"}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  roles: state.roles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { assignRole, getRoles, refreshStatusAndLoading }
)(AssignRole);
