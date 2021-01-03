import MyNavbar from "./MyNavbar";
import MyQuote from "./MyQuote";
import MyModal from "./components/MyModal.js";
import MyController from "./MyController"
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      login: null,
      isTeacher: false,
      isAdmin: false,
      isModalOpen: false
    };
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.content=[];
  }

  logOut() {
    this.setState((state) => ({
      isLoggedIn: false,
      login: null,
      isTeacher: false,
      isAdmin: false,
    }));
    var newModal = <MyModal
      key={Date.now()} isSuccess={true} body= "You were successfully logged out" redirectToHome={true}
    />;
    this.content.push(newModal);
  }

  logIn(pLogin, pIsTeacher, pIsAdmin) {
    this.setState((state) => ({
      isLoggedIn: true,
      login: pLogin,
      isTeacher: pIsTeacher,
      isAdmin: pIsAdmin
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
        />
        <MyController
          isLoggedIn={isLoggedIn}
          login={login}
          isTeacher={isTeacher}
          isAdmin={isAdmin}
          onLogIn={this.logIn}
        />
        <MyQuote />
        <div>
          {this.content.length ? this.content : null}
        </div>
      </div>
    );
  }
}

export default App;
