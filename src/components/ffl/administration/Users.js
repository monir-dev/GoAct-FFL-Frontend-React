import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../common/Spinner";
import _ from "lodash";
import * as d3 from "d3";
import $ from "jquery";
import swal from "@sweetalert/with-react";
import {
  getUsers,
  editUserApprovalStatus,
  deleteUser
} from "../../../actions/usersAction";

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
        approved: null
      }
    };
  }

  componentDidMount = () => {
    this.props.getUsers();
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  editAction = e => {
    const id = this.getIdOfElement(e);
    const data = this.props.users.users.filter(item => item.id == id);

    this.setState({
      modal: {
        type: "edit",
        id: _.parseInt(id),
        title: "Change Approve Status?",
        approved: data[0].Approved
      }
    });

    $("#editDeleteModal").modal("show");
  };

  deleteAction = e => {
    let id = this.getIdOfElement(e);
    this.setState({
      modal: {
        ...this.state.modal,
        type: "delete",
        id: _.parseInt(id),
        title: "Are you sure want to delete?",
        approved: null
      }
    });
    $("#editDeleteModal").modal("show");
  };

  getIdOfElement = e => {
    return e.target.id ? e.target.id : e.target.parentNode.id;
  };

  actionButtons = row => {
    const id = row.row.id;
    return (
      <div>
        <button
          className="btn btn-sm btn-outline-warning"
          data-row={row.row}
          id={id}
          onClick={this.editAction}
        >
          <i class="fas fa-pen-fancy">{""}</i>
        </button>{" "}
        <button
          className="btn btn-sm btn-outline-danger"
          data-row={row.row}
          id={id}
          onClick={this.deleteAction}
        >
          <i class="fas fa-times">{""}</i>
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

  onCloseModal = () => {
    this.setState({
      modal: {
        type: null,
        id: null,
        title: null,
        approved: null
      }
    });
    $("#editDeleteModal").modal("hide");
  };

  onSubmit = e => {
    e.preventDefault();

    const id = this.state.modal.id;
    const users = this.props.users.users;

    if (this.state.modal.type == "edit") {
      const approvedStatus = this.state.modal.approved;
      // update user status
      this.props.editUserApprovalStatus(id, approvedStatus, users);
    } else if (this.state.modal.type == "delete") {
      // delete user
      this.props.deleteUser(id, users);
    }

    // close modal
    this.onCloseModal();
  };

  modalContent = () => {
    const { type, title, approved } = this.state.modal;
    return (
      <div
        id="editDeleteModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={this.onSubmit} method="POST">
              <div className="modal-body">
                <div className="form-group">
                  <h5 style={{ color: "#63c2de" }}>{title}</h5>
                </div>
                {type == "edit" ? (
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
                ) : (
                  ""
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className={
                    type == "delete" ? "btn btn-danger" : "btn btn-primary"
                  }
                >
                  {type == "delete" ? "Delete" : "Save Changes"}
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

    return users == null || loading ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">{this.modalContent()}</div>
        <div className="card">
          <div className="card-header">All Members</div>
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
                  Header: "StaffId",
                  accessor: "StaffId",
                  width: 70
                },
                {
                  Header: "Desg",
                  accessor: "Desg"
                },
                {
                  Header: "ServiceGroup",
                  accessor: "ServiceGroup"
                },
                {
                  Header: "Company",
                  accessor: "Company"
                },
                {
                  Header: "Dept",
                  accessor: "Dept",
                  width: 100
                },
                {
                  Header: "Location",
                  accessor: "Location",
                  width: 90
                },
                {
                  Header: "Country",
                  accessor: "Country",
                  width: 90
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
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers, editUserApprovalStatus, deleteUser }
)(Users);
