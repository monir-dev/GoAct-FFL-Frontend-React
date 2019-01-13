import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import classnames from "classnames";
import _ from "lodash";
import * as d3 from "d3";
import $ from "jquery";
import {
  getUsers,
  editUserApprovalStatus,
  deleteUser,
  addUser
} from "../../actions/membersAction";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      modal: {
        type: null,
        id: null,
        title: null,
        approved: null,
        staffId: "",
        modalLoading: false
      },
      errMsg: null,
      succMsg: null
    };
  }

  componentDidMount = () => {
    this.props.getUsers();
  };

  componentWillReceiveProps(nextProps) {
    const errors = !_.isEmpty(nextProps.errors) ? nextProps.errors : null;
    const successMsg = !_.isEmpty(nextProps.users.successMsg)
      ? nextProps.users.successMsg
      : null;

    this.setState({
      modal: {
        ...this.state.modal,
        modalLoading: errors ? false : nextProps.users.modalLoading
      },
      errMsg: errors,
      succMsg: successMsg
    });
  }

  addMember = () => {
    this.setState({
      modal: {
        ...this.state.modal,
        type: "add",
        title: "Add new member",
        staffId: "",
        modalLoading: false
      },
      errMsg: null,
      succMsg: null
    });
    $("#AddModal").modal("show");
  };

  editAction = e => {
    const id = this.getIdOfElement(e);
    const data = this.props.users.users.filter(item => item.id == id);

    this.setState({
      modal: {
        ...this.state.modal,
        type: "edit",
        id: _.parseInt(id),
        title: "Change Approve Status?",
        approved: data[0].Approved,
        staffId: ""
      }
    });

    $("#EditModal").modal("show");
  };

  deleteAction = e => {
    let id = this.getIdOfElement(e);
    this.setState({
      modal: {
        ...this.state.modal,
        type: "delete",
        id: _.parseInt(id),
        title: "Are you sure want to delete?",
        approved: null,
        staffId: ""
      }
    });
    $("#DeleteModal").modal("show");
  };

  getIdOfElement = e => {
    return e.target.id ? e.target.id : e.target.parentNode.id;
  };

  actionButtons = row => {
    const id = row.original.id;
    return (
      <div>
        <button
          className="btn btn-sm btn-outline-warning"
          data-row={row.row}
          id={id}
          onClick={this.editAction}
        >
          <i className="fas fa-pen-fancy">{""}</i>
        </button>{" "}
        <button
          className="btn btn-sm btn-outline-danger"
          data-row={row.row}
          id={id}
          onClick={this.deleteAction}
        >
          <i className="fas fa-times">{""}</i>
        </button>
      </div>
    );
  };

  onChange = e => {
    this.setState({
      modal: {
        ...this.state.modal,
        [e.target.name]: e.target.value
      }
    });
  };

  onCloseModal = modalId => {
    this.setState({
      modal: {
        ...this.state.modal,
        type: null,
        id: null,
        title: null,
        approved: null,
        staffId: "",
        modalLoading: false
      },
      errMsg: null,
      succMsg: null
    });
    $(`#${modalId}`).modal("hide");
  };

  onAddModalSubmit = e => {
    e.preventDefault();

    const { staffId } = this.state.modal;
    const { addUser } = this.props;
    const { users } = this.props.users;

    this.setState({
      modal: {
        ...this.state.modal,
        modalLoading: true
      },
      errMsg: null,
      succMsg: null
    });

    addUser(staffId, users);
  };

  onEditModalSubmit = e => {
    e.preventDefault();

    const { id, approved } = this.state.modal;
    const { editUserApprovalStatus } = this.props;
    const { users } = this.props.users;

    // update user status
    editUserApprovalStatus(id, approved, users);
    this.onCloseModal("EditModal");
  };

  onDeleteModalSubmit = e => {
    e.preventDefault();

    const { id } = this.state.modal;
    const { deleteUser } = this.props;
    const { users } = this.props.users;

    // delete user
    deleteUser(id, users);
    this.onCloseModal("DeleteModal");
  };

  deleteModalContent = () => {
    const { type, title, approved, modalLoading } = this.state.modal;
    const errors = this.props.errors;
    const successMsg = this.props.users.successMsg;

    return (
      <div
        id="DeleteModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={this.onDeleteModalSubmit} method="POST">
              <div className="modal-body">
                <div className="form-group">
                  <h5 style={{ color: "#63c2de" }}>{title}</h5>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onCloseModal("DeleteModal")}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  editModalContent = () => {
    const { title, approved } = this.state.modal;
    return (
      <div
        id="EditModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={this.onEditModalSubmit} method="POST">
              <div className="modal-body">
                <div className="form-group">
                  <h5 style={{ color: "#63c2de" }}>{title}</h5>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 col-form-label">Status</label>
                  <div className="col-md-10 col-form-label">
                    <div className="form-check form-check-inline mr-1">
                      <input
                        className="form-check-input"
                        id="inline-radio1"
                        type="radio"
                        value="1"
                        name="approved"
                        onChange={this.onChange}
                        checked={approved == "1" ? "checked" : ""}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inline-radio1"
                        style={{ color: "#4dbd74" }}
                      >
                        Approved
                      </label>
                    </div>
                    <div
                      className="form-check form-check-inline mr-1"
                      style={{ marginLeft: "20px" }}
                    >
                      <input
                        className="form-check-input"
                        id="inline-radio2"
                        type="radio"
                        value="0"
                        name="approved"
                        onChange={this.onChange}
                        checked={approved == "0" ? "checked" : ""}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inline-radio2"
                        style={{ color: "#ffc107" }}
                      >
                        Pending
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onCloseModal("EditModal")}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  AddModalContent = () => {
    const { title, modalLoading } = this.state.modal;
    const { errMsg, succMsg } = this.state;

    let buttonState;
    let modalContent;
    let submitButtonText;

    if (modalLoading == true) {
      buttonState = modalLoading ? "disabled" : "";
      modalContent = <Spinner />;
      submitButtonText = "Adding...";
    } else {
      submitButtonText = "Add Member";
      modalContent = (
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-user" />
              </span>
            </div>
            <input
              className={classnames("form-control addModalSubmitButton", {
                "is-invalid": errMsg,
                "is-valid": succMsg
              })}
              id="staffId"
              type="text"
              name="staffId"
              placeholder="Staff Id"
              value={this.state.modal.staffId}
              onChange={this.onChange}
            />
            <div className="invalid-feedback">{errMsg}</div>
            <div className="valid-feedback">{succMsg}</div>
          </div>
        </div>
      );
    }

    return (
      <div
        id="AddModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={this.onAddModalSubmit} method="POST">
              <div className="modal-body">
                <div className="form-group">
                  <h5 style={{ color: "#63c2de" }}>{title}</h5>
                </div>

                {modalContent}
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={buttonState}
                >
                  {submitButtonText}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onCloseModal("AddModal")}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  filterResult = (filter, row) => {
    const rowField = _.lowerCase(row[filter.id]);
    const searchValue = _.lowerCase(filter.value);

    return _.includes(rowField, searchValue) ? true : false;
  };

  render() {
    const { users, loading } = this.props.users;

    return _.isEmpty(users) || loading ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">
          {this.AddModalContent()}
          {this.deleteModalContent()}
          {this.editModalContent()}
        </div>
        <div className="card">
          <div className="card-header">
            All Members
            <button
              className="btn btn-sm btn-pill btn-outline-success"
              style={{ float: "right" }}
              onClick={this.addMember}
            >
              <i className="fas fa-plus" /> Add Member
            </button>
          </div>
          <div className="card-body">
            <ReactTable
              data={users}
              filterable
              defaultFilterMethod={(filter, row) =>
                this.filterResult(filter, row)
              }
              columns={[
                {
                  Header: "ID",
                  accessor: "id",
                  minWidth: 30
                },
                {
                  Header: "Name",
                  accessor: "Name",
                  minWidth: 110
                },
                {
                  Header: "Email",
                  accessor: "Email",
                  minWidth: 180
                },
                {
                  Header: "Actions",
                  width: 70,
                  Cell: row => this.actionButtons(row)
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUsers, editUserApprovalStatus, deleteUser, addUser }
)(Users);
