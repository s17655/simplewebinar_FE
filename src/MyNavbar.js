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
    return (
      <div>
        <Navbar expand="md" color="dark" dark>
          <NavbarBrand href="#">Simple Webinar</NavbarBrand>
          <NavbarToggler />
          <Collapse isOpen="true" navbar>
            <Nav className="mr-auto" navbar>
              {this.state.isLoggedIn && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Student
                  </DropdownToggle>
                  <DropdownMenu left>
                    <DropdownItem>My webinars</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {this.state.isLoggedIn && this.state.isTeacher && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Teacher
                  </DropdownToggle>
                  <DropdownMenu left>
                    <DropdownItem>My webinars</DropdownItem>
                    <DropdownItem>Add Webinar</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {this.state.isLoggedIn && this.state.isAdmin && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu left>
                    <DropdownItem>Users</DropdownItem>
                    <DropdownItem>Add User</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              <NavItem>
                <NavLink href="#">Contact</NavLink>
              </NavItem>
            </Nav>
            {this.state.isLoggedIn && (
              <Button color="warning" onClick={this.logOut}>
                Log out
              </Button>
            )}
            {!this.state.isLoggedIn && <Button color="info">Sign up</Button>}
            {"'"}
            {!this.state.isLoggedIn && (
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
