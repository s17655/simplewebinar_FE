import React from "react";
import { Container } from "reactstrap";

function FormHeader(props) {
  return (
    <div>
      <br />
      <br />
      <Container>
        <p className="text-center">
          <b> {props.text} </b>
        </p>
      </Container>
      <br />
    </div>
  );
}

export default FormHeader;
