import React from "react";
import FormHeader from "../components/FormHeader.js";
import SignupForm from "../specificComponents/SignupForm.js";

class PageSignup extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text="Sign up" />
        <SignupForm/>
      </div>
    );
  }
}

export default PageSignup;
