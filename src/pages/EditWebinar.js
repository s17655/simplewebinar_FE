import React from "react";
import FormHeader from "../components/FormHeader.js";
import WebinarForm from "../components/WebinarForm.js";
import {withRouter} from "react-router-dom"


class PageEditWebinar extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text={"Edit Webinar: "+this.props.location.webinarCode} />
        <WebinarForm addEdit="edit" login={this.props.login}/>
      </div>
    );
  }
}

export default withRouter(PageEditWebinar);
