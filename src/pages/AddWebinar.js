import React from "react";
import FormHeader from "../components/FormHeader.js";
import AddWebinarForm from "../specificComponents/AddWebinarForm.js";

class AddWebinar extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text="Add Webinar" />
        <AddWebinarForm login={this.props.login}/>
      </div>
    );
  }
}

export default AddWebinar;
