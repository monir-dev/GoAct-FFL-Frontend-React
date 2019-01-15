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
import Edit from "./Edit";
import Delete from "./Delete";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
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

  showEditUserModal = e => {
    const id = this.getIdOfElement(e);
    this.setState({ id: _.parseInt(id), modalType: "edit" });
    $("#Modal").modal("show");
  };

  showDeleteUserModal = e => {
    let id = this.getIdOfElement(e);
    this.setState({
      id: _.parseInt(id),
      modalType: "delete"
    });
    $("#Modal").modal("show");
  };

  getIdOfElement = e => {
    return e.target.id ? e.target.id : e.target.parentNode.id;
  };

  onModalClose = () => {
    this.setState({ modalType: "add", id: null });
    $(`#Modal`).modal("hide");
  };

  actionButtons = row => {
    const id = row.original.id;
    return (
      <div>
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

  filterResult = (filter, row) => {
    const rowField = _.lowerCase(row[filter.id]);
    const searchValue = _.lowerCase(filter.value);

    return _.includes(rowField, searchValue) ? true : false;
  };

  render() {
    const { users, loading } = this.props.users;

    const { modalType } = this.state;

    let modalContent;
    if (modalType == "add") {
      modalContent = <Add onModalClose={this.onModalClose} />;
    } else if (modalType == "edit") {
      modalContent = (
        <Edit id={this.state.id} onModalClose={this.onModalClose} />
      );
    } else if (modalType == "delete") {
      modalContent = (
        <Delete id={this.state.id} onModalClose={this.onModalClose} />
      );
    }

    return _.isEmpty(users) || loading ? (
      <Spinner />
    ) : (
      <div>
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
          <div className="card-header">
            All Members
            <button
              className="btn btn-sm btn-pill btn-outline-success"
              style={{ float: "right" }}
              onClick={this.showAddUserModal}
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
  { getUsers }
)(Users);
