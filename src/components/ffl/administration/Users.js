import React, { Component } from "react";
import { makeData } from "./Utils";
import axios from "axios";
import Spinner from "../../common/Spinner";
import _ from "lodash";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      // data: makeData(),
      data: []
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
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => this.filterResult(filter, row)}
          columns={[
            {
              Header: "Name",
              accessor: "Name"
            },
            {
              Header: "Email",
              accessor: "Email"
            },
            {
              Header: "StaffId",
              accessor: "StaffId"
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
              accessor: "Dept"
            },
            {
              Header: "Location",
              accessor: "Location"
            },
            {
              Header: "Country",
              accessor: "Country"
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
