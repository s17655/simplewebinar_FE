import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";


class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  logOut() {
    this.props.onLogOut();
  }

  logIn() {
    this.props.onLogIn();
  }

  render() {

    const isLoggedIn = this.props.isLoggedIn;
    const login = this.props.login;
    const isTeacher = this.props.isTeacher;
    const isAdmin = this.props.isAdmin;


    return (
      <div>
        <Navbar expand="md" color="dark" dark>
          <Link to="/">
            <NavbarBrand >Simple Webinar</NavbarBrand>
          </Link>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Student
                  </DropdownToggle>

                  <DropdownMenu left="true">
                  <Link to="/mywebinars">
                    <DropdownItem>My webinars</DropdownItem>
                  </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {isLoggedIn && isTeacher && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Teacher
                  </DropdownToggle>
                  <DropdownMenu left="true">
                  <Link to="/teacherwebinars">
                    <DropdownItem>My webinars</DropdownItem>
                  </Link>
                  <Link to="/addwebinar">
                    <DropdownItem>Add Webinar</DropdownItem>
                  </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {isLoggedIn && isAdmin && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu left="true">
                  <Link to="/userlist">
                    <DropdownItem>Users</DropdownItem>
                  </Link>
                  <Link to="/adduser">
                    <DropdownItem>Add User</DropdownItem>
                  </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              <NavItem>
              <Link to="/contact">
                <NavLink>Contact</NavLink>
              </Link>
              </NavItem>
            </Nav>
            {isLoggedIn && (
              <Button color="warning" onClick={this.logOut}>
                Log out
              </Button>
            )}
            {!isLoggedIn && (
              <Link to="/signup">
              <Button color="info">Sign up</Button>
              </Link>)}
            {"'"}
            {!isLoggedIn && (
              <Link to="/login">
              <Button color="success" onClick={this.logIn}>
                Log in
              </Button>
              </Link>
            )}
            {"'"}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default MyNavbar;
