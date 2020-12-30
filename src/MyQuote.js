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
          <p Style="text-align:right">
            {" "}
            Live as if you were to die tomorrow. Learn as if you were to live forever.
            {" "}
          </p>
          <footer className="blockquote-footer" Style="text-align:right">
            Mahatma Gandhi
          </footer>
        </blockquote>
      </Container>
      </div>
  )
}

export default MyQuote;
