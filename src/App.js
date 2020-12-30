import "./App.css";
import MyNavbar from "./MyNavbar";
import MyJumbotron from "./MyJumbotron";
import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <div>
        <MyNavbar />
        <MyJumbotron />
      </div>
    );
  }
}

export default App;
