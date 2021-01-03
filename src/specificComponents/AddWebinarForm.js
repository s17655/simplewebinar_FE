import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { submitPost, showError, showOk } from "../functions/APIfunctions.js";
import MyModal from "../components/MyModal.js";

class AddWebinarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
    };
    this.sendForm = this.sendForm.bind(this);
    this.contentx = [];
    this.inputDate = React.createRef();
    this.inputStartTime = React.createRef();
    this.inputFinishTime = React.createRef();
  }

  async sendForm() {
    var success,
      textBody,
      redirect = false;
    const myForm = document.getElementById("addWebinarForm");
    const formData = new FormData(myForm);

    //zczytanie dat
    var fDate = this.inputDate.current.value;
    var fStartTime = this.inputStartTime.current.value;
    var fFinishTime = this.inputFinishTime.current.value;

    if (fDate === "") fDate = null;

    if (fStartTime === "") fStartTime = null;
    else fStartTime = (fDate != null ? fDate : "1900-01-01") + "T" + fStartTime;

    if (fFinishTime === "") fFinishTime = null;
    else
      fFinishTime = (fDate != null ? fDate : "1900-01-01") + "T" + fFinishTime;

    var data2 = {
      Login: this.props.login,
      Date: fDate,
      StartTime: fStartTime,
      FinishTime: fFinishTime,
    };

    let response = await submitPost(
      formData,
      data2,
      "http://localhost:58870/api/simplewebinar/webinars"
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
          <Form id="addWebinarForm">
            <FormGroup>
              <Label for="Topic">Topic</Label>
              <Input
                type="text"
                name="Topic"
                id="Topic"
                placeholder="Add topic"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Code">Webinar Code</Label>
              <Input
                type="text"
                name="Code"
                id="Code"
                placeholder="Add Code (5 signs; digits or Capital letters only)"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Date">Date</Label>
              <Input
                innerRef={this.inputDate}
                type="date"
                id="Date"
                placeholder="Add date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="StartTime">Start Time</Label>
              <Input
                innerRef={this.inputStartTime}
                type="time"
                id="StartTime"
                placeholder="Add start time"
              />
            </FormGroup>
            <FormGroup>
              <Label for="FinishTime">Finish Time</Label>
              <Input
                innerRef={this.inputFinishTime}
                type="time"
                id="FinishTime"
                placeholder="Add finish time"
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

export default AddWebinarForm;
