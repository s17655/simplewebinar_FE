import React from "react";
import FormHeader from "../components/FormHeader.js";
import LoginForm from "../specificComponents/LoginForm.js";

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn(pLogin, pIsTeacher, pIsAdmin) {
    this.props.onLogIn(pLogin, pIsTeacher, pIsAdmin);
  }

  render() {
    return (
      <div>
        <FormHeader text="Log in" />
        <LoginForm
          isLoggedIn={this.props.isLoggedIn}
          login={this.props.login}
          isTeacher={this.props.isTeacher}
          isAdmin={this.props.isAdmin}
          onLogIn={this.logIn}
        />
      </div>
    );
  }
}

export default PageLogin;
