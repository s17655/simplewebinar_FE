import React from "react";
import FormHeader from "../components/FormHeader.js";
import {withRouter} from "react-router-dom"
import UserForm from "../components/UserForm.js";


class PageEditUser extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text={"Edit User: "+this.props.location.userCode} />
        <UserForm addEdit="edit"/>
      </div>
    );
  }
}

export default withRouter(PageEditUser);
