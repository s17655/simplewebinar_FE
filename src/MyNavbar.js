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
          <NavbarBrand href="#">Simple Webinar</NavbarBrand>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Student
                  </DropdownToggle>
                  <DropdownMenu left="true">
                    <DropdownItem>My webinars</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {isLoggedIn && isTeacher && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Teacher
                  </DropdownToggle>
                  <DropdownMenu left="true">
                    <DropdownItem>My webinars</DropdownItem>
                    <DropdownItem>Add Webinar</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {isLoggedIn && isAdmin && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu left="true">
                    <DropdownItem>Users</DropdownItem>
                    <DropdownItem>Add User</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              <NavItem>
                <NavLink href="#">Contact</NavLink>
              </NavItem>
            </Nav>
            {isLoggedIn && (
              <Button color="warning" onClick={this.logOut}>
                Log out
              </Button>
            )}
            {!isLoggedIn && <Button color="info">Sign up</Button>}
            {"'"}
            {!isLoggedIn && (
              <Button color="success" onClick={this.logIn}>
                Log in
              </Button>
            )}
            {"'"}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default MyNavbar;
