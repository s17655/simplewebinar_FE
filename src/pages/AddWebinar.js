import React from "react";
import FormHeader from "../components/FormHeader.js";
import WebinarForm from "../components/WebinarForm.js";

class PageAddWebinar extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text="Add Webinar" />
        <WebinarForm addEdit="add" login={this.props.login}/>
      </div>
    );
  }
}

export default PageAddWebinar;
