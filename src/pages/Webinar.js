import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Table, Button, Label } from "reactstrap";
import { getObjects } from "../functions/APIfunctions";
import NoteSelect from "../specificComponents/NoteSelect";

class PageWebinar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonResponse: null
    };
  }

  async componentDidMount(){
    var finalURL = "http://localhost:58870/api/simplewebinar/webinars/"+this.props.location.webinarCode;
    var resp = await getObjects(
      finalURL
    );
    this.setState({ jsonResponse: resp });
    console.log(resp);
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
                <Button color="success">Sign in</Button>
                {"  "}
                <Button color="info">Sign out</Button>
                {"  "}
                <Button color="warning">Edit</Button>
                {"  "}
                <Button color="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td><Label>Note the course!</Label></td>
              <td></td>
            </tr>
            <NoteSelect/>
          </Table>
        </Container>)}
      </div>
    );
  }
}

export default withRouter(PageWebinar);
