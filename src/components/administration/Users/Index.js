import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import _ from "lodash";
import $ from "jquery";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import { getUsers } from "../../../actions/UsersAction";
import Add from "./Add";
import AssignRole from "./AssignRole";
import Edit from "./Edit";
import Delete from "./Delete";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      ids: [],
      modalType: ""
    };
  }

  componentDidMount = () => {
    this.props.getUsers();
  };

  showAddUserModal = () => {
    this.setState({ modalType: "add" });
    $("#Modal").modal("show");
  };

  showEditUserRoleModal = e => {
    const id = this.getIdOfElement(e);
    this.setState({ id: _.parseInt(id), modalType: "assign_role" });
    $("#Modal").modal("show");
  };

  showEditUserModal = e => {
    const id = this.getIdOfElement(e);
    this.setState({ id: _.parseInt(id), modalType: "edit" });
    $("#Modal").modal("show");
  };

  showDeleteUserModal = e => {
    let id = this.getIdOfElement(e);

    if (id === "bulk") {
      this.setState({
        modalType: "bulk_delete"
      });
    } else {
      this.setState({
        id: _.parseInt(id),
        modalType: "delete"
      });
    }
    $("#Modal").modal("show");
  };

  getIdOfElement = e => {
    return e.target.id ? e.target.id : e.target.parentNode.id;
  };

  onModalClose = () => {
    this.setState({ modalType: "", id: null });
    $("#Modal").modal("hide");
  };

  actionButtons = row => {
    const id = row.original.id;
    return (
      <div>
        <button
          className="btn btn-sm btn-outline-primary"
          data-row={row.row}
          id={id}
          onClick={this.showEditUserRoleModal}
        >
          <i class="fas fa-unlock-alt">{""}</i>
        </button>{" "}
        <button
          className="btn btn-sm btn-outline-warning"
          data-row={row.row}
          id={id}
          onClick={this.showEditUserModal}
        >
          <i className="fas fa-pen-fancy">{""}</i>
        </button>{" "}
        <button
          className="btn btn-sm btn-outline-danger"
          data-row={row.row}
          id={id}
          onClick={this.showDeleteUserModal}
        >
          <i className="fas fa-times">{""}</i>
        </button>
      </div>
    );
  };

  onCheckField = e => {
    let ids = this.state.ids;
    const id = e.target.id;

    if (e.target.checked) {
      ids.push(_.parseInt(id));
    } else {
      ids = ids.filter(item => item !== _.parseInt(id));
    }
    this.setState({
      ids
    });
  };

  checkBox = row => {
    const id = row.original.id;
    return (
      <div>
        <div className="form-check">
          <input
            style={{ marginLeft: "-16px" }}
            type="checkbox"
            className="form-check-input"
            id={id}
            name="checked_row"
            onChange={this.onCheckField}
          />
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
    const usersData = users ? users : [];

    const { modalType } = this.state;

    let modalContent;
    if (modalType === "add") {
      modalContent = <Add onModalClose={this.onModalClose} />;
    } else if (modalType === "edit") {
      modalContent = (
        <Edit id={this.state.id} onModalClose={this.onModalClose} />
      );
    } else if (modalType === "delete") {
      modalContent = (
        <Delete id={this.state.id} onModalClose={this.onModalClose} />
      );
    } else if (modalType === "bulk_delete") {
      modalContent = (
        <Delete ids={this.state.ids} onModalClose={this.onModalClose} />
      );
    } else if (modalType === "assign_role") {
      modalContent = (
        <AssignRole userId={this.state.id} onModalClose={this.onModalClose} />
      );
    }

    return loading ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">
          <div className="" style={{ padding: "20px" }}>
            <h4 style={{ float: "left", color: "#63c2de" }}>
              <i className="icon-user" style={{ marginRight: "7px" }} />
              All Users
            </h4>
            <div
              style={{ float: "left", marginLeft: "20px", marginTop: "0px" }}
            >
              <button
                className="btn btn-sm  btn-outline-success"
                onClick={this.showAddUserModal}
              >
                <i className="fas fa-plus" /> Add User
              </button>
              <button
                style={{ marginLeft: "7px" }}
                className="btn btn-sm  btn-outline-danger"
                id="bulk"
                onClick={this.showDeleteUserModal}
              >
                <i class="fas fa-trash-alt" /> Bulk Delete
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            id="Modal"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">{modalContent}</div>
            </div>
          </div>
        </div>
        <div className="card">
          <ReactTable
            data={usersData}
            filterable
            defaultFilterMethod={(filter, row) =>
              this.filterResult(filter, row)
            }
            columns={[
              {
                Header: "ID",
                // accessor: "id",
                maxWidth: 30,
                Cell: row => this.checkBox(row)
              },
              {
                Header: "Name",
                accessor: "name",
                minWidth: 110
              },
              {
                Header: "Email",
                accessor: "email",
                minWidth: 180
              },
              {
                Header: "Actions",
                width: 105,
                Cell: row => this.actionButtons(row)
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
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
  { getUsers }
)(Users);
