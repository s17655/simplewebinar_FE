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
import MyModal from "../components/MyModal.js";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
    };
    this.sendForm = this.sendForm.bind(this);
    this.contentx = [];
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
                id="Message"
                placeholder="Add message"
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

export default ContactForm;
