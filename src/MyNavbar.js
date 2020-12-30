import React, { Component } from "react";
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

function MyNavbar(props) {
  return (
    <div>
      <Navbar expand="md" color="dark" dark>
        <NavbarBrand href="#">Simple Webinar</NavbarBrand>
        <NavbarToggler />
        <Collapse isOpen="true" navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Student
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>My webinars</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Teacher
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>My webinars</DropdownItem>
                <DropdownItem>Add Webinar</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>Users</DropdownItem>
                <DropdownItem>Add User</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="#">Contact</NavLink>
            </NavItem>
          </Nav>
          <Button color="info">Sign up</Button>
          {"'"}
          <Button color="success">Log in</Button>
          {"'"}
          <Button color="warning">Log out</Button>
          {"'"}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
