import React from "react";
import { Switch, Route } from "react-router-dom";
import PageHome from "./pages/Home";
import PageLogin from "./pages/Login";
import PageSignup from "./pages/Signup";


class MyController extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn(pLogin, pIsTeacher, pIsAdmin) {
    this.props.onLogIn(pLogin, pIsTeacher, pIsAdmin);
  }



  render() {
    return (
      <Switch>
        {" "}
        <Route exact path="/" ><PageHome/></Route>}
        <Route exact path="/login"><PageLogin
          isLoggedIn={this.props.isLoggedIn}
          login={this.props.isLoggedIn}
          isTeacher={this.props.isLoggedIn}
          isAdmin={this.props.isLoggedIn}
          onLogIn={this.logIn}
        /></Route>}
        <Route exact path="/signup" ><PageSignup/></Route>}
      </Switch>
    );
  }
}

export default MyController;
