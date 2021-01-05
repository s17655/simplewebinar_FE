import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Table, Button } from "reactstrap";
import { getObjects, submitDelete, showError, showOk } from "../functions/APIfunctions";
import MyModal from "../components/MyModal.js";


class PageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonResponse: null,
      isModalOpen: true,
    };
    this.contentx = [];
    this.deleteUser=this.deleteUser.bind(this);
    this.goToObject=this.goToObject.bind(this);
  }


  async componentDidMount(){
    var finalURL = "http://localhost:58870/api/simplewebinar/users/"+this.props.location.userCode;
    var resp = await getObjects(
      finalURL
    );
    this.setState({ jsonResponse: resp });
  }

  async deleteUser(){
    var success,
      textBody,
      redirect = false;

    var response = await submitDelete("http://localhost:58870/api/simplewebinar/users/"+this.props.location.userCode)

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

  goToObject(key){
    this.props.history.push(
      {pathname: "/edituser/"+key,
      userCode: key});
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
                <Button color="warning" onClick={()=>this.goToObject(this.props.location.userCode)}>Edit</Button>
                {"  "}
                <Button color="danger" onClick={this.deleteUser}>Delete</Button>
              </td>
            </tr>
          </Table>
        </Container>)}
        <div>{this.state.isModalOpen ? this.contentx : null}</div>
      </div>
    );
  }
}

export default withRouter(PageUser);
