import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Table, Button, Label } from "reactstrap";
import { getObjects,submitDelete, showOk, showError, submitPost } from "../functions/APIfunctions";
import NoteSelect from "../specificComponents/NoteSelect";
import MyModal from "../components/MyModal.js";


class PageWebinar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonResponse: null,
      isModalOpen: true,
      isFinished:	false,
      isUserSignedUp:	false,
      isUserATeacher:	false,
      isNotedByUser: false,
    };
    this.contentx = [];
    this.deleteWebinar=this.deleteWebinar.bind(this);
    this.signInOut=this.signInOut.bind(this);
    this.noteSetState=this.noteSetState.bind(this);
  }

  async componentDidMount(){
    var finalURL = "http://localhost:58870/api/simplewebinar/webinars/"
      +this.props.location.webinarCode+(this.props.isLoggedIn?"/"+this.props.login:"");
    var resp = await getObjects(
      finalURL
    );
    this.setState({ jsonResponse: resp });
    this.setState({
      isFinished:	resp.isFinished,
      isUserSignedUp:	resp.isUserSignedUp,
      isUserATeacher:	resp.isUserATeacher,
      isNotedByUser: resp.isNotedByUser,
    });
    this.goToObject=this.goToObject.bind(this);
    this.noteSetState=this.noteSetState.bind(this);
  }

  noteSetState(){
    this.setState({ isNotedByUser: true });
  }


  goToObject(key){
    this.props.history.push(
      {pathname: "/editwebinar/"+key,
      webinarCode: key});
  }

  async signInOut(inOut, webinarCode){
    var success,
      textBody,
      redirect = false;

    var formData = new FormData();
    var data2 = {
      "login": this.props.login
    }

    let response = null;
    if(inOut==="in"){
      response = await submitPost(formData,data2,"http://localhost:58870/api/simplewebinar/participations/"+webinarCode);
    }else if(inOut==="out"){
      response = await submitDelete("http://localhost:58870/api/simplewebinar/participations/"+webinarCode,
        '{"login": "'+this.props.login+'"}');
    }

    if (response.ok) {
      this.setState({ isUserSignedUp: inOut==="in"?true:false });
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

  async deleteWebinar(){
    var success,
      textBody,
      redirect = false;

    var response = await submitDelete("http://localhost:58870/api/simplewebinar/webinars/"+this.props.location.webinarCode,
      '{"login": "'+this.props.login+'"}')

    if (response.ok) {
      success = true;
      textBody = await showOk(response);
      redirect=true;
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
        <br />
        <br />
        {(this.state.jsonResponse!=null)&&(<Container>
          <Table borderless={true}>
            <tr>
              <td><b> {this.state.jsonResponse.topic} </b></td>
            </tr>
            <tr>
              <td>Teacher</td>
              <td> {this.state.jsonResponse.teacher} </td>
            </tr>
            <tr>
              <td>Date</td>
              <td> {this.state.jsonResponse.date} </td>
            </tr>
            <tr>
              <td>Start</td>
              <td> {this.state.jsonResponse.start} </td>
            </tr>
            <tr>
              <td>End</td>
              <td> {this.state.jsonResponse.end} </td>
            </tr>
            <tr>
              <td>Code</td>
              <td> {this.state.jsonResponse.code} </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>
                {this.props.isLoggedIn&&!(this.state.isUserSignedUp)&&!(this.state.isFinished)&&!(this.state.isUserATeacher)&&(
                  <Button color="success" onClick={()=>this.signInOut("in",this.props.location.webinarCode)}>Sign in</Button>)}
                {"  "}
                {this.props.isLoggedIn&&this.state.isUserSignedUp&&!(this.state.isFinished)&&!(this.state.isUserATeacher)&&(
                  <Button color="info" onClick={()=>this.signInOut("out",this.props.location.webinarCode)}>Sign out</Button>)}
                {"  "}
                {!(this.state.isFinished)&&this.state.isUserATeacher&&(
                  <Button color="warning" onClick={()=>this.goToObject(this.props.location.webinarCode)}>Edit</Button>)}
                {"  "}
                {!(this.state.isFinished)&&this.state.isUserATeacher&&(
                  <Button color="danger"  onClick={this.deleteWebinar}>Delete</Button>)}
              </td>
            </tr>
            <tr>
              <td>
                {this.state.isUserSignedUp&&this.state.isFinished&&
                  (<Label>{this.state.isNotedByUser?"Your note:":"Note the course!"}</Label>)}
              </td>
              <td></td>
            </tr>
            <NoteSelect note={this.state.jsonResponse.note} login={this.props.login}
            isFinished={this.state.isFinished} isUserSignedUp={this.state.isUserSignedUp}
            isNotedByUser={this.state.isNotedByUser} onNoteSetState={this.noteSetState}
            />
          </Table>
        </Container>)}
        <div>{this.state.isModalOpen ? this.contentx : null}</div>
      </div>
    );
  }
}

export default withRouter(PageWebinar);
