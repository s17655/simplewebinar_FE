import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { submitPost, showError, showOk, getObjects, submitPut } from "../functions/APIfunctions.js";
import MyModal from "../components/MyModal.js";
import {withRouter} from "react-router-dom";

class WebinarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
      jsonResponse: null,
      code:"",
      topic:"",
      date:"",
      startTime:"",
      endTime:""
    };
    this.sendForm = this.sendForm.bind(this);
    this.contentx = [];
    this.inputDate = React.createRef();
    this.inputStartTime = React.createRef();
    this.inputFinishTime = React.createRef();
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
      var finalURL = "http://localhost:58870/api/simplewebinar/webinars/"+this.props.location.webinarCode;
      var resp = await getObjects(
        finalURL
      );
      this.setState({
        jsonResponse: resp,
        code:resp.code,
        topic:resp.topic,
        date:resp.date,
        startTime:resp.start,
        endTime:resp.end

       });
      console.log(resp);
    }
  }




  async sendForm() {
    var success,
      textBody,
      redirect = false;
    const myForm = document.getElementById("WebinarForm");
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

    let response=null;
    if(this.props.addEdit==="edit"){
      response = await submitPut(
        formData,
        data2,
        "http://localhost:58870/api/simplewebinar/webinars/"+this.props.location.webinarCode
      );
    }else{
      response = await submitPost(
        formData,
        data2,
        "http://localhost:58870/api/simplewebinar/webinars"
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
          <Form id="WebinarForm">
            <FormGroup>
              <Label for="Topic">Topic</Label>
              <Input
                type="text"
                name="Topic"
                id="topic"
                placeholder="Add topic"
                required
                onChange = {this.handleInputChange}
                value={this.state.topic}
              />
            </FormGroup>
            {this.props.addEdit==="add"&&(
            <FormGroup>
              <Label for="Code">Webinar Code</Label>
              <Input
                type="text"
                name="Code"
                id="code"
                placeholder="Add Code (5 signs; digits or Capital letters only)"
                required
                onChange = {this.handleInputChange}
                value={this.state.code}
              />
            </FormGroup>)}
            <FormGroup>
              <Label for="Date">Date</Label>
              <Input
                innerRef={this.inputDate}
                type="date"
                id="date"
                placeholder="Add date"
                required
                onChange = {this.handleInputChange}
                value={this.state.date}
              />
            </FormGroup>
            <FormGroup>
              <Label for="StartTime">Start Time</Label>
              <Input
                innerRef={this.inputStartTime}
                type="time"
                id="startTime"
                placeholder="Add start time"
                required
                onChange = {this.handleInputChange}
                value={this.state.startTime}
              />
            </FormGroup>
            <FormGroup>
              <Label for="FinishTime">Finish Time</Label>
              <Input
                innerRef={this.inputFinishTime}
                type="time"
                id="endTime"
                placeholder="Add finish time"
                required
                onChange = {this.handleInputChange}
                value={this.state.endTime}
              />
            </FormGroup>
            <Button
              color="info"
              style={{ float: "right" }}
              onClick={this.sendForm}
              disabled={this.state.topic.length<1||this.state.code.length<1
                ||this.state.date.length<1||this.state.startTime.length<1
                ||this.state.endTime.length<1
              }
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

export default withRouter(WebinarForm);
