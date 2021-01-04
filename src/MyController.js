import React from "react";
import { Switch, Route } from "react-router-dom";
import PageHome from "./pages/Home";
import PageLogin from "./pages/Login";
import PageSignup from "./pages/Signup";
import PageContact from "./pages/Contact";
import PageAddUser from "./pages/AddUser";
import PageAddWebinar from "./pages/AddWebinar";
import PageMyWebinars from "./pages/MyWebinars";
import PageTeacherWebinars from "./pages/TeacherWebinars";
import PageUserList from "./pages/UserList";
import PageUser from "./pages/User";
import PageWebinar from "./pages/Webinar";



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
          login={this.props.login}
          isTeacher={this.props.isTeacher}
          isAdmin={this.props.isAdmin}
          onLogIn={this.logIn}
        /></Route>}
        <Route exact path="/signup" ><PageSignup/></Route>}
        <Route exact path="/contact" ><PageContact/></Route>}
        <Route exact path="/adduser" ><PageAddUser/></Route>}
        <Route exact path="/addwebinar" ><PageAddWebinar
          login={this.props.login}
        /></Route>}
        <Route exact path="/mywebinars" ><PageMyWebinars
          login={this.props.login}
        /></Route>}
        <Route exact path="/teacherwebinars" ><PageTeacherWebinars
          login={this.props.login}
        /></Route>}
        <Route exact path="/userlist" ><PageUserList
          isAdmin={this.props.isAdmin}
        /></Route>}
        <Route path="/user" ><PageUser
          isAdmin={this.props.isAdmin}
        /></Route>}
        <Route path="/webinar" ><PageWebinar
          isLoggedIn={this.props.isLoggedIn}
          isTeacher={this.props.isTeacher}
          login={this.props.login}
        /></Route>}
      </Switch>
    );
  }
}

export default MyController;
