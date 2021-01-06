import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { getObjects, submitPost, showError, showOk, submitPut } from "../functions/APIfunctions.js";
import { isValiEmail } from "../functions/otherFunctions.js";
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
      password:"",
      password2:"",
      email:"",
      login:"",
      name:"",
      surnme:""
    };
    this.sendForm = this.sendForm.bind(this);
    this.contentx = [];
    this.inputTeacher = React.createRef();
    this.inputAdmin = React.createRef();
    this.toggleChangeTeacher=this.toggleChangeTeacher.bind(this);
    this.toggleChangeAdmin=this.toggleChangeAdmin.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    this.setState({
      [id]: value
    });
  }

  async componentDidMount(){
    if(this.props.addEdit==="edit"){
      var finalURL = "http://localhost:58870/api/simplewebinar/users/"+this.props.location.userCode;
      var resp = await getObjects(
        finalURL
      );
      this.setState({
        jsonResponse: resp,
        isCheckedTeacher: resp.isTeacher,
        isCheckedAdmin: resp.isAdmin,
        login:resp.login,
        email:resp.email,
        password:resp.password,
        password2:resp.password,
        name:resp.name,
        surname:resp.surname
       });
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

    let response=null;
    if(this.props.addEdit==="edit"){
        response = await submitPut(
        formData,
        data2,
        "http://localhost:58870/api/simplewebinar/users/"+this.props.location.userCode);
    }else{
        response = await submitPost(
        formData,
        data2,
        "http://localhost:58870/api/simplewebinar/users"
      );
    }

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
                id="login"
                placeholder="Add login"
                required
                onChange = {this.handleInputChange}
                value={this.state.login}
              />
            </FormGroup>)}
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input type="text" name="Name" id="name" placeholder="Add name"
              required
              onChange = {this.handleInputChange}
              value={this.state.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Surname">Surname</Label>
              <Input
                type="text"
                name="Surname"
                id="surname"
                placeholder="Add surname"
                required
                onChange = {this.handleInputChange}
                value={this.state.surname}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="email"
                name="Email"
                id="email"
                placeholder="Add email"
                required
                onChange = {this.handleInputChange}
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                type="password"
                name="Password"
                id="password"
                placeholder="Add password"
                required
                onChange = {this.handleInputChange}
                value={this.state.password}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password2">Repeat password</Label>
              <Input
                type="password"
                name="Password2"
                id="password2"
                placeholder="Repeat password"
                required
                onChange = {this.handleInputChange}
                value={this.state.password2}
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
              onClick={this.sendForm}
              disabled=
              {this.state.email.length<1||this.state.login.length<1
                ||this.state.password.length<1||this.state.password2.length<1
                ||this.state.name.length<1||this.state.surname.length<1
                ||!(isValiEmail(this.state.email))}
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

export default withRouter(UserForm);
