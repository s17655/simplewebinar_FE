import MyNavbar from "./MyNavbar";
import MyQuote from "./MyQuote";
import MyModal from "./components/MyModal.js";
import Main from "./Main"
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      login: null,
      isTeacher: true,
      isAdmin: true,
    };
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  logOut() {
    this.setState((state) => ({
      isLoggedIn: false,
      login: null,
      isTeacher: false,
      isAdmin: false,
    }));
    this.modal = <MyModal key={Date.now()} isSuccess={true} body= "You were successfully logged out" redirectToHome={true}/>;
  }

  logIn() {
    this.setState((state) => ({
      isLoggedIn: true,
      //login: null,
      //isTeacher: false,
      //isAdmin: false,
    }));
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const login = this.state.login;
    const isTeacher = this.state.isTeacher;
    const isAdmin = this.state.isAdmin;

    return (
      <div>
        <MyNavbar
          isLoggedIn={isLoggedIn}
          login={login}
          isTeacher={isTeacher}
          isAdmin={isAdmin}
          onLogOut={this.logOut}
          onLogIn={this.logIn}
        />
        <Main />
        <MyQuote />
        {this.modal}
      </div>
    );
  }
}

export default App;
