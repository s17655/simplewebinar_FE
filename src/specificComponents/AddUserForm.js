import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { submitPost, showError, showOk } from "../functions/APIfunctions.js";
import MyModal from "../components/MyModal.js";

class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
    };
    this.sendForm = this.sendForm.bind(this);
    this.contentx = [];
    this.inputTeacher = React.createRef();
    this.inputAdmin = React.createRef();
  }

  async sendForm() {
    var success,
      textBody,
      redirect = false;
    const myForm = document.getElementById("addUserForm");
    const formData = new FormData(myForm);
    var data2 = {
      isTeacher: this.inputTeacher.current.checked,
      isAdmin: this.inputAdmin.current.checked
    };

    let response = await submitPost(
      formData,
      data2,
      "http://localhost:58870/api/simplewebinar/users"
    );

    if (response.ok) {
      success = true;
      textBody = await showOk(response);
    } else {
      success = false;
      textBody = await showError(response);
    }

    var newModal = (
      <MyModal
        key={Date.now()}
        isSuccess={success}
        body={textBody}
        redirectToHome={redirect}
      />
    );
    this.contentx.push(newModal);
    this.setState((state) => ({
      isModalOpen: true,
    }));
  }

  render() {
    return (
      <div>
        <Container>
          <Form id="addUserForm">
            <FormGroup>
              <Label for="Login">Login</Label>
              <Input
                type="text"
                name="Login"
                id="Login"
                placeholder="Add login"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input type="text" name="Name" id="Name" placeholder="Add name" />
            </FormGroup>
            <FormGroup>
              <Label for="Surname">Surname</Label>
              <Input
                type="text"
                name="Surname"
                id="Surname"
                placeholder="Add surname"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="Email"
                id="Email"
                placeholder="Add email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="Password"
                id="Password"
                placeholder="Add password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password2">Repeat password</Label>
              <Input
                type="password"
                name="Password2"
                id="Password2"
                placeholder="Repeat password"
              />
            </FormGroup>
            <Container>
              <FormGroup>
                <Label for="IsTeacher">
                  <Input
                    innerRef={this.inputTeacher}
                    type="checkbox"
                    id="IsTeacher"
                  />
                  Teacher
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for="IsAdmin">
                  <Input
                    innerRef={this.inputAdmin}
                    type="checkbox"
                    id="IsAdmin"
                  />
                  Admin
                </Label>
              </FormGroup>
            </Container>
            <Button
              color="info"
              style={{ float: "right" }}
              onClick={this.sendForm}
            >
              Submit
            </Button>
          </Form>
        </Container>
        <div>{this.state.isModalOpen ? this.contentx : null}</div>
      </div>
    );
  }
}

export default AddUserForm;
