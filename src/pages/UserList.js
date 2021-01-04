import React from "react";
import TableHeadline from "../components/TableHeadline.js";
import FetchUserTable from "../specificComponents/FetchUserTable.js";

class PageUserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br />
        <TableHeadline text="Users: " />
        {this.props.isAdmin && (
          <FetchUserTable />
        )}
      </div>
    );
  }
}

export default PageUserList;
