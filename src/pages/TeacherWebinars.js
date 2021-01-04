import React from "react";
import TableHeadline from "../components/TableHeadline.js";
import FetchWebinarTable from "../components/FetchWebinarTable.js";

class PageTeacherWebinars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br/>
        <TableHeadline text="Upcoming Webinars hosted by you: "/>
        <FetchWebinarTable url="http://localhost:58870/api/simplewebinar/webinars/future" login={this.props.login}/>
        <br/>
        <br/>
        <TableHeadline text="Done Webinars hosted by you: "/>
        <FetchWebinarTable url="http://localhost:58870/api/simplewebinar/webinars/past" login={this.props.login}/>
      </div>
    );
  }
}

export default PageTeacherWebinars;
