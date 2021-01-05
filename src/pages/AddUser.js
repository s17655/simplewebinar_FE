import React from "react";
import FormHeader from "../components/FormHeader.js";
import UserForm from "../components/UserForm.js";

class PageAddUser extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text="Add User" />
        <UserForm addEdit="add"/>
      </div>
    );
  }
}

export default PageAddUser;
