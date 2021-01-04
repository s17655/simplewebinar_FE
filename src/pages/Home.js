import React from "react";
import MyJumbotron from "../components/MyJumbotron.js";
import TableHeadline from "../components/TableHeadline.js";
import FetchWebinarTable from "../components/FetchWebinarTable.js";

class PageHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyJumbotron />
        <TableHeadline text="Upcoming Webinars: "/>
        <FetchWebinarTable url="http://localhost:58870/api/simplewebinar/webinars/future"/>
      </div>
    );
  }
}

export default PageHome;
