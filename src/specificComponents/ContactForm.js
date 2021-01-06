import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { submitPost, showError, showOk } from "../functions/APIfunctions.js";
import { isValiEmail } from "../functions/otherFunctions.js";
import MyModal from "../components/MyModal.js";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
      message: "",
      email: ""
    };
    this.sendForm = this.sendForm.bind(this);
    this.contentx = [];
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

  async sendForm() {
    var success,
      textBody,
      redirect = false;
    const myForm = document.getElementById("contactForm");
    const formData = new FormData(myForm);

    let response = await submitPost(
      formData,
      null,
      "http://localhost:58870/api/simplewebinar/messages"
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
          <Form id="contactForm">
            <FormGroup>
              <Label for="Message">Message</Label>
              <Input
                type="textarea"
                name="Message"
                id="message"
                placeholder="Add message"
                required
                onChange = {this.handleInputChange}
                value={this.state.message}
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
            <Button
              color="info"
              style={{ float: "right" }}
              onClick={this.sendForm}
              disabled={this.state.email.length<1||this.state.message.length<1||!(isValiEmail(this.state.email))}
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

export default ContactForm;
