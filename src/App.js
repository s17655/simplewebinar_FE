import "./App.css";
import MyNavbar from "./MyNavbar";
import MyJumbotron from "./MyJumbotron";
import MyQuote from "./MyQuote";
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <MyNavbar />
        <MyJumbotron />
        <MyQuote />
      </div>
    );
  }
}

export default App;
