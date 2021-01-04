import React from "react";
import { Container, Table } from "reactstrap";
import { getObjects } from "../functions/APIfunctions";
import { withRouter } from 'react-router-dom';

class FetchUserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonResponse: null
    };
    this.renderTableData = this.renderTableData.bind(this);
    this.goToObject=this.goToObject.bind(this);
  }

  async componentDidMount() {
    var finalURL = "http://localhost:58870/api/simplewebinar/users";
    var resp = await getObjects(
      finalURL
    );
    this.setState({ jsonResponse: resp });
  }

  goToObject(key){
    this.props.history.push("user/"+key);
  }

  renderTableData(jsonFile) {

    return jsonFile.map((user, index) => {
      const { login, isTeacher, isAdmin } = user; //destructuring
      return (
        <tr key={login} onClick={()=>this.goToObject(login)}>
          <td>{login}</td>
          <td>{""+isTeacher}</td>
          <td>{""+isAdmin}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Container>
        <Table striped hover>
          <thead>
            <tr>
              <th>Login</th>
              <th>Teacher</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>{(this.state.jsonResponse!=null)&&this.renderTableData(this.state.jsonResponse)}</tbody>
        </Table>
      </Container>
    );
  }
}

export default withRouter(FetchUserTable);
