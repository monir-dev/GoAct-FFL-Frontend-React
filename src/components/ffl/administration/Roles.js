import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import classnames from "classnames";
import _ from "lodash";
import * as d3 from "d3";
import $ from "jquery";

import {
  getRoles,
  addRole,
  editRole,
  deleteRole
} from "../../../actions/rolesAction";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Roles extends Component {
  constructor() {
    super();
    this.state = {
      modal: {
        id: null,
        title: null,
        approved: null,
        staffId: "",
        modalLoading: false,
        name: "",
        display_name: "",
        description: ""
      },
      errMsg: null,
      succMsg: null
    };
  }

  componentDidMount = () => {
    this.props.getRoles();
  };

  componentWillReceiveProps(nextProps) {
    const errors = !_.isEmpty(nextProps.errors) ? nextProps.errors : null;
    const successMsg = !_.isEmpty(nextProps.roles.successMsg)
      ? nextProps.roles.successMsg
      : null;

    this.setState({
      modal: {
        ...this.state.modal,
        modalLoading: errors ? false : nextProps.roles.modalLoading
      },
      errMsg: errors,
      succMsg: successMsg
    });
  }

  addRole = () => {
    this.setState({
      modal: {
        ...this.state.modal,
        title: "Add new member",
        modalLoading: false
      },
      errMsg: null,
      succMsg: null
    });
    $("#AddModal").modal("show");
  };

  editAction = e => {
    const id = this.getIdOfElement(e);
    const data = this.props.roles.roles.filter(item => item.id == id)[0];

    this.setState({
      modal: {
        ...this.state.modal,
        id: _.parseInt(id),
        title: "Edit Role",
        name: data.name,
        display_name: data.display_name,
        description: data.description
      }
    });

    $("#EditModal").modal("show");
  };

  deleteAction = e => {
    let id = this.getIdOfElement(e);
    this.setState({
      modal: {
        ...this.state.modal,
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
        id: null,
        title: null,
        approved: null,
        staffId: "",
        modalLoading: false,
        name: "",
        display_name: "",
        description: ""
      },
      errMsg: null,
      succMsg: null
    });
    $(`#${modalId}`).modal("hide");
  };

  onAddModalSubmit = e => {
    e.preventDefault();

    const { name, display_name, description } = this.state.modal;
    const { roles } = this.props.roles;

    const data = { name, display_name, description };

    this.setState({
      modal: {
        ...this.state.modal,
        modalLoading: true
      },
      errMsg: null,
      succMsg: null
    });

    this.props.addRole(data, roles);
    this.onCloseModal("AddModal");
  };

  onEditModalSubmit = e => {
    e.preventDefault();

    const { id, name, display_name, description } = this.state.modal;
    const { roles } = this.props.roles;

    const data = {
      name,
      display_name,
      description
    };

    // update role
    this.props.editRole(id, data, roles);
    this.onCloseModal("EditModal");
  };

  onDeleteModalSubmit = e => {
    e.preventDefault();

    const { id } = this.state.modal;
    const { roles } = this.props.roles;

    // delete user
    this.props.deleteRole(id, roles);
    this.onCloseModal("DeleteModal");
  };

  deleteModalContent = () => {
    const { title } = this.state.modal;

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
            <form
              onSubmit={this.onEditModalSubmit}
              method="POST"
              className="form-horizontal"
            >
              <div className="modal-body">
                <div className="form-group">
                  <h5 style={{ color: "#63c2de" }}>{title}</h5>
                </div>
                <br />
                <div className="form-group row">
                  <label
                    className="col-md-3 col-form-label text-right"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      name="name"
                      value={this.state.modal.name}
                      onChange={this.onChange}
                    />
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
                      className="form-control"
                      id="display_name"
                      type="text"
                      name="display_name"
                      value={this.state.modal.display_name}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    className="col-md-3 col-form-label text-right"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      id="description"
                      type="text"
                      name="description"
                      value={this.state.modal.description}
                      onChange={this.onChange}
                    />
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

    let buttonState;
    let modalContent;
    let submitButtonText;

    if (modalLoading == true) {
      buttonState = modalLoading ? "disabled" : "";
      modalContent = <Spinner />;
      submitButtonText = "Adding...";
    } else {
      submitButtonText = "Add Role";
      modalContent = (
        <div>
          <br />
          <div className="form-group row">
            <label
              className="col-md-3 col-form-label text-right"
              htmlFor="name"
            >
              Name
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                id="name"
                type="text"
                name="name"
                value={this.state.modal.name}
                onChange={this.onChange}
              />
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
                className="form-control"
                id="display_name"
                type="text"
                name="display_name"
                value={this.state.modal.display_name}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              className="col-md-3 col-form-label text-right"
              htmlFor="description"
            >
              Description
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                id="description"
                type="text"
                name="description"
                value={this.state.modal.description}
                onChange={this.onChange}
              />
            </div>
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
    const loading = this.props.roles.loading;
    const data = this.props.roles.roles;

    return _.isEmpty(data) || loading ? (
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
            All Roles
            <button
              className="btn btn-sm btn-pill btn-outline-success"
              style={{ float: "right" }}
              onClick={this.addRole}
            >
              <i className="fas fa-plus" /> Add Role
            </button>
          </div>
          <div className="card-body">
            <ReactTable
              data={data}
              filterable
              defaultFilterMethod={(filter, row) =>
                this.filterResult(filter, row)
              }
              columns={[
                {
                  Header: "Name",
                  accessor: "display_name",
                  minWidth: 110
                },
                {
                  Header: "Description",
                  accessor: "description"
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
  roles: state.roles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRoles, editRole, deleteRole, addRole }
)(Roles);
