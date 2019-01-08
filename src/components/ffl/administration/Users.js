import React, { Component } from "react";
import { makeData } from "./Utils";
import axios from "axios";
import Spinner from "../../common/Spinner";
import _ from "lodash";
import * as d3 from "d3";
import $ from "jquery";
import swal from "@sweetalert/with-react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      // data: makeData(),
      data: [],
      modal: {
        type: null,
        id: null,
        title: null,
        body: null,
        button: null
      }
    };
  }

  componentDidMount = () => {
    axios
      .get("/users")
      .then(res => res.data)
      .then(res => {
        let data = res.map(item => {
          return {
            id: item.id,
            Name: item.Name,
            Email: item.Email,
            StaffId: item.StaffId,
            Desg: item.Desg,
            ServiceGroup: item.ServiceGroup,
            Company: item.Company,
            Dept: item.Dept,
            Location: item.Location,
            Country: item.Country
          };
        });
        this.setState({ data: data });
      })
      .catch(err => console.log(err));
  };

  clickedMe = value => {
    if (value == "submit") {
      console.log(value);
    }
  };
  editAction = e => {
    this.setState({
      modal: {
        type: null,
        id: null,
        title: null,
        body: null,
        button: null
      }
    });
    let id = this.getIdOfElement(e);
    $("#editModal").modal("show");

    console.log(id);
  };

  deleteAction = e => {
    console.log(e.target.id);
    this.setState({
      modal: {
        isOpen: true
      }
    });
    this.toggleModal();
  };

  getIdOfElement = e => {
    let id;
    if (e.target.id) {
      id = e.target.id;
    } else {
      id = e.target.parentNode.id;
    }
    return id;
  };

  actionButtons = row => {
    const id = row.row.id;
    return (
      <div>
        <button
          className="btn btn-sm btn-outline-warning"
          id={id}
          onClick={this.editAction}
        >
          <i className="fa fa-plus">{""}</i>
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          style={{ marginLeft: "3px" }}
          id={id}
          onClick={this.deleteAction}
        >
          <i className="fa fa-trash">{""}</i>
        </button>
      </div>
    );
  };

  modalContentSweetAlert = () => {
    // swal({
    //   text: "Are you going to update this status?",
    //   buttons: {
    //     cancel: "Close",
    //     confirm: {
    //       text: "Submit",
    //       value: "submit"
    //     }
    //   },
    //   content: (
    //     <div>
    //       <div className="form-group" />
    //     </div>
    //   )
    // }).then(value => this.clickedMe(value));
    const { modalClass, type, id, title, body, button } = this.state.modal;
    return (
      <div
        className="modal fade"
        id="editModalSweetAlert"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.toggleModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  modalContent = () => {
    return (
      <div
        id="editModal"
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
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
    const { data } = this.state;

    return !data.length ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">{this.modalContent()}</div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => this.filterResult(filter, row)}
          columns={[
            {
              Header: "ID",
              accessor: "id",
              minWidth: 20
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
        <br />
      </div>
    );
  }
}

export default Users;
