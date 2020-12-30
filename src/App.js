import "./App.css";
import MyNavbar from "./MyNavbar";
import MyJumbotron from "./MyJumbotron";
import MyQuote from "./MyQuote";
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
        <MyJumbotron />
        <MyQuote />
      </div>
    );
  }
}

export default App;
