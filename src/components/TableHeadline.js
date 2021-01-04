import React from "react";
import { Container } from "reactstrap";

function TableHeadline(props) {
  return (
    <Container>
      <h1 className="page-header">
        <small> {props.text} </small>
      </h1>
      <br />
    </Container>
  );
}

export default TableHeadline;
