import React from "react";
import FormHeader from "../components/FormHeader.js";
import AddUserForm from "../specificComponents/AddUserForm.js";

class AddUser extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text="Add User" />
        <AddUserForm/>
      </div>
    );
  }
}

export default AddUser;
