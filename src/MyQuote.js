import React from "react";
import {
  Container
} from "reactstrap";

function MyQuote(props){
    return(
      <div>
      <br/>
      <br/>
      <hr/>
      <Container>
        <blockquote className="blockquote mb-0">
          <p style={{"textAlign":"right"}}>
            {" "}
            Live as if you were to die tomorrow. Learn as if you were to live forever.
            {" "}
          </p>
          <footer className="blockquote-footer" style={{"textAlign":"right"}}>
            Mahatma Gandhi
          </footer>
        </blockquote>
      </Container>
      </div>
  )
}

export default MyQuote;
