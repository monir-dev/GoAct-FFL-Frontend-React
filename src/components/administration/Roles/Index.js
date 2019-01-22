import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import _ from "lodash";
import $ from "jquery";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import { getRoles } from "../../../actions/RolesAction";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";

class Roles extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      ids: [],
      modalType: ""
    };
  }

  componentDidMount = () => {
    this.props.getRoles();
  };

  showAddRoleModal = () => {
    this.setState({ modalType: "add" });
    $("#Modal").modal("show");
  };

  showEditRoleModal = e => {
    const id = this.getIdOfElement(e);
    this.setState({ id: _.parseInt(id), modalType: "edit" });
    $("#Modal").modal("show");
  };

  showDeleteRoleModal = e => {
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
    this.setState({ modalType: "add", id: null });
    $("#Modal").modal("hide");
  };

  actionButtons = row => {
    const id = row.original.id;
    return (
      <div>
        <Link
          className="btn btn-sm btn-outline-primary"
          data-row={row.row}
          to={`/permissions/${id}`}
        >
          <i className="fas fa-unlock-alt">{""}</i>
        </Link>{" "}
        <button
          className="btn btn-sm btn-outline-warning"
          data-row={row.row}
          id={id}
          onClick={this.showEditRoleModal}
        >
          <i className="fas fa-pen-fancy">{""}</i>
        </button>{" "}
        <button
          className="btn btn-sm btn-outline-danger"
          data-row={row.row}
          id={id}
          onClick={this.showDeleteRoleModal}
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
    const { roles, loading } = this.props.roles;
    const rolesData = roles ? roles : [];
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
    } else if (modalType === "bulk_delete") {
      modalContent = (
        <Delete ids={this.state.ids} onModalClose={this.onModalClose} />
      );
    }

    return loading ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">
          <div className="table-before">
            <h4>
              <i className="fas fa-unlock-alt" />
              All Roles
            </h4>
            <div className="table-before-button-group">
              <button
                className="btn btn-sm  btn-outline-success"
                onClick={this.showAddRoleModal}
              >
                <i className="fas fa-plus" /> Add Roles
              </button>
              <button
                className="btn btn-sm  btn-outline-danger"
                id="bulk"
                onClick={this.showDeleteRoleModal}
              >
                <i className="fas fa-trash-alt" /> Bulk Delete
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
            data={rolesData}
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
                Header: "Display Name",
                accessor: "display_name",
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
  roles: state.roles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRoles }
)(Roles);
