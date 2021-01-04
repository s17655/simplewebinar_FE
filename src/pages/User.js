import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Table, Button } from "reactstrap";
import { getObjects } from "../functions/APIfunctions";

class PageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonResponse: null
    };
  }


  async componentDidMount(){
    var finalURL = "http://localhost:58870/api/simplewebinar/users/"+this.props.location.userCode;
    var resp = await getObjects(
      finalURL
    );
    this.setState({ jsonResponse: resp });
  }


  render() {
    return (
      <div>
        <br />
        <br />
        {(this.state.jsonResponse!=null)&&(<Container>
          <Table borderless={true}>
            <tr>
              <td><b> {this.props.location.userCode} </b></td>
            </tr>
            <tr>
              <td>Name</td>
              <td> {this.state.jsonResponse.name} </td>
            </tr>
            <tr>
              <td>Surname</td>
              <td> {this.state.jsonResponse.surname} </td>
            </tr>
            <tr>
              <td>Login</td>
              <td> {this.state.jsonResponse.login} </td>
            </tr>
            <tr>
              <td>Email</td>
              <td> {this.state.jsonResponse.email} </td>
            </tr>
            <tr>
              <td>Password</td>
              <td> {this.state.jsonResponse.password} </td>
            </tr>
            <tr>
              <td>Teacher</td>
              <td> {""+this.state.jsonResponse.isTeacher} </td>
            </tr>
            <tr>
              <td>Admin</td>
              <td> {""+this.state.jsonResponse.isAdmin} </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button color="warning">Edit</Button>
                {"  "}
                <Button color="danger">Delete</Button>
              </td>
            </tr>
          </Table>
        </Container>)}
      </div>
    );
  }
}

export default withRouter(PageUser);
