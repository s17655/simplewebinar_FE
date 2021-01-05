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
    };
    this.contentx = [];
    this.deleteWebinar=this.deleteWebinar.bind(this);
    this.signInOut=this.signInOut.bind(this);
  }

  async componentDidMount(){
    var finalURL = "http://localhost:58870/api/simplewebinar/webinars/"+this.props.location.webinarCode;
    var resp = await getObjects(
      finalURL
    );
    this.setState({ jsonResponse: resp });
    this.goToObject=this.goToObject.bind(this);
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
                <Button color="success" onClick={()=>this.signInOut("in",this.props.location.webinarCode)}>Sign in</Button>
                {"  "}
                <Button color="info" onClick={()=>this.signInOut("out",this.props.location.webinarCode)}>Sign out</Button>
                {"  "}
                <Button color="warning" onClick={()=>this.goToObject(this.props.location.webinarCode)}>Edit</Button>
                {"  "}
                <Button color="danger"  onClick={this.deleteWebinar}>Delete</Button>
              </td>
            </tr>
            <tr>
              <td><Label>Note the course!</Label></td>
              <td></td>
            </tr>
            <NoteSelect/>
          </Table>
        </Container>)}
        <div>{this.state.isModalOpen ? this.contentx : null}</div>
      </div>
    );
  }
}

export default withRouter(PageWebinar);
