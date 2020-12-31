import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";

// przy wywołaniu MyModal należy zawsze dodać key={Date.now()}, aby wymusić stworzenie nowej instancji modala
class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state={isOpen: true};
    this.onOk = this.onOk.bind(this);
  }

onOk(){
  this.setState((state) => ({
    isOpen: false
  }));
}


  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} toggle={this.onOk}>
          <ModalHeader>
            {this.props.isSuccess
              ? "Success!"
              : "Wait - something has gone wrong!"}
          </ModalHeader>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.onOk} > OK </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default MyModal;
