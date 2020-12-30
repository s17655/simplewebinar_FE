import React from "react";
import {
  Jumbotron,
  Container
} from "reactstrap";

function MyJumbotron(props){
    return(
      <div>
        <Jumbotron className="text-center">
          <Container>
            <h1>Welcome To Simple Webinar</h1>
            <p> Study with us! Teach with us! Get your best! </p>
          </Container>
        </Jumbotron>
      </div>
  )
}

export default MyJumbotron;
