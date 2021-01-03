import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";

// przy wywołaniu MyModal należy zawsze dodać key={Date.now()}, aby wymusić stworzenie nowej instancji modala
// props: isSuccess, body, redirectToHome
class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.onOk = this.onOk.bind(this);
  }

  onOk() {
    this.setState((state) => ({
      isOpen: false,
    }));
  }

  render() {
    const okButton = this.props.redirectToHome ? (
      <Link to="/">
        <Button color="info" onClick={this.onOk}>
          OK
        </Button>
      </Link>
    ) : (
      <Button color="info" onClick={this.onOk}>
        OK
      </Button>
    );

    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.onOk}>
          <ModalHeader>
            {this.props.isSuccess
              ? "Success!"
              : "Wait - something has gone wrong!"}
          </ModalHeader>
            <ModalBody>{this.props.body}</ModalBody>
          <ModalFooter>{okButton}</ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default MyModal;
