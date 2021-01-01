import React from "react";
import MyJumbotron from "../components/MyJumbotron.js";
import { Container, Table } from "reactstrap";

class PageHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyJumbotron />
        <Container>
          <h1 className="page-header">
            <small> Upcoming Webinars: </small>
          </h1>
        </Container>
        <br />
        <Container>
          <Table striped hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Date</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PageHome;
