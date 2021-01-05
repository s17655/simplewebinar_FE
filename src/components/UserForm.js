import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { getObjects, submitPost, showError, showOk } from "../functions/APIfunctions.js";
import MyModal from "../components/MyModal.js";
import {withRouter} from "react-router-dom";

//props addEdit = "add" or "edit"
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
      jsonResponse: null,
      isCheckedAdmin: false,
      isCheckedTeacher: false,
    };
    this.sendForm = this.sendForm.bind(this);
    this.contentx = [];
    this.inputTeacher = React.createRef();
    this.inputAdmin = React.createRef();
    this.toggleChangeTeacher=this.toggleChangeTeacher.bind(this);
    this.toggleChangeAdmin=this.toggleChangeAdmin.bind(this);
  }


  async componentDidMount(){
    if(this.props.addEdit==="edit"){
      var finalURL = "http://localhost:58870/api/simplewebinar/users/"+this.props.location.userCode;
      var resp = await getObjects(
        finalURL
      );
      this.setState({jsonResponse: resp });
      this.setState({isCheckedTeacher: this.state.jsonResponse.isTeacher});
      this.setState({isCheckedAdmin: this.state.jsonResponse.isAdmin});
    }
  }

  toggleChangeTeacher = () => {
    this.setState({
      isCheckedTeacher: !this.state.isCheckedTeacher,
    })};

  toggleChangeAdmin = () => {
    this.setState({
      isCheckedAdmin: !this.state.isCheckedAdmin,
    })};



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
            {this.props.addEdit==="add"&&(
            <FormGroup>
              <Label for="Login">Login</Label>
              <Input
                type="text"
                name="Login"
                id="Login"
                placeholder="Add login"
              />
            </FormGroup>)}
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input type="text" name="Name" id="Name" placeholder="Add name"
                defaultValue={this.state.jsonResponse===null?"":this.state.jsonResponse.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Surname">Surname</Label>
              <Input
                type="text"
                name="Surname"
                id="Surname"
                placeholder="Add surname"
                defaultValue={this.state.jsonResponse===null?"":this.state.jsonResponse.surname}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="Email"
                id="Email"
                placeholder="Add email"
                defaultValue={this.state.jsonResponse===null?"":this.state.jsonResponse.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="Password"
                id="Password"
                placeholder="Add password"
                defaultValue={this.state.jsonResponse===null?"":this.state.jsonResponse.password}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password2">Repeat password</Label>
              <Input
                type="password"
                name="Password2"
                id="Password2"
                placeholder="Repeat password"
                defaultValue={this.state.jsonResponse===null?"":this.state.jsonResponse.password}
              />
            </FormGroup>
            <Container>
              <FormGroup>
                <Label for="IsTeacher">
                  <Input
                    innerRef={this.inputTeacher}
                    type="checkbox"
                    id="IsTeacher"
                    checked={this.state.isCheckedTeacher}
                    onChange={this.toggleChangeTeacher}
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
                    checked={this.state.isCheckedAdmin}
                    onChange={this.toggleChangeAdmin}
                  />
                  Admin
                </Label>
              </FormGroup>
            </Container>
            <Button
              color="info"
              style={{ float: "right" }}
              onClick={this.sendForm}>
              Submit
            </Button>
          </Form>
        </Container>
        <div>{this.state.isModalOpen ? this.contentx : null}</div>
      </div>
    );
  }
}

export default withRouter(UserForm);
