import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { submitPost, showError } from "../functions/APIfunctions.js";
import MyModal from "../components/MyModal.js";
import FormHeader from "../components/FormHeader.js";

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true
    };
    this.sendForm = this.sendForm.bind(this);
    this.inputLogin = React.createRef();
    this.contentx=[];
    this.logIn = this.logIn.bind(this);
  }

  logIn(pLogin, pIsTeacher, pIsAdmin) {
    this.props.onLogIn(pLogin, pIsTeacher, pIsAdmin);
  }

  async sendForm() {
    var success,
      textBody,
      redirect = false;
    const myForm = document.getElementById("loginForm");
    const formData = new FormData(myForm);

    let response = await submitPost(
      formData,
      null,
      "http://localhost:58870/api/simplewebinar/login/" +
        this.inputLogin.current.value
    );

    if (response.ok) {
      success = true;
      textBody = await response.text();
      redirect = true;
      var respJSON = JSON.parse(textBody);
      this.logIn(respJSON.login,respJSON.isTeacher,respJSON.isAdmin);
      textBody="You were successfully logged in!"
    } else {
      success = false;
      textBody = await showError(response);
      redirect = false;
    }

    var newModal = <MyModal
      key={Date.now()} isSuccess={success} body= {textBody} redirectToHome={redirect}
    />;
    this.contentx.push(newModal);
    this.setState((state) => ({
      isModalOpen: true
    }));
  }

  render() {
    return (
      <div>
        <FormHeader text="Log in"/>
        <Container>
          <Form id="loginForm">
            <FormGroup>
              <Label for="Login">Login</Label>
              <Input
                innerRef={this.inputLogin}
                type="text"
                name="Login"
                id="Login"
                placeholder="Add login"
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
            <Button
              color="success"
              style={{ float: "right" }}
              onClick={this.sendForm}
            >
              Log in
            </Button>
          </Form>
        </Container>
        <div>
          {this.state.isModalOpen ? this.contentx : null}
        </div>
      </div>
    );
  }
}

export default PageLogin;
