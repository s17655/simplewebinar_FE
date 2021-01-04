import React from "react";
import TableHeadline from "../components/TableHeadline.js";
import FetchWebinarTable from "../components/FetchWebinarTable.js";

class PageMyWebinars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br/>
        <TableHeadline text="Upcoming Webinars: "/>
        <FetchWebinarTable url="http://localhost:58870/api/simplewebinar/webinars/future/student" login={this.props.login}/>
        <br/>
        <br/>
        <TableHeadline text="Done Webinars: "/>
        <FetchWebinarTable url="http://localhost:58870/api/simplewebinar/webinars/past/student" login={this.props.login}/>
      </div>
    );
  }
}

export default PageMyWebinars;
