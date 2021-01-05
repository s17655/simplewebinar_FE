import React from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { submitPut, showOk, showError } from "../functions/APIfunctions";
import MyModal from "../components/MyModal.js";


class NoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note==null?5:this.props.note,
      isModalOpen: true
    };
    this.contentx = [];
    this.toggleChangeNote = this.toggleChangeNote.bind(this);
    this.noteWebinar = this.noteWebinar.bind(this);
  }

  toggleChangeNote = (event) => {
    this.setState({
      note: event.target.value,
    });
  };

  async noteWebinar(webinarCode) {
    var success,
      textBody,
      redirect = false;

    var formData = new FormData();
    var data2 = {
      login: this.props.login,
      note: parseInt(this.state.note),
    };

    var response = await submitPut(
      formData,
      data2,
      "http://localhost:58870/api/simplewebinar/participations/" + webinarCode
    );

    if (response.ok) {
      success = true;
      textBody = await showOk(response);
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

  render() {
    return (
      <tr>
        <td>
          <FormGroup>
            <Input
              type="select"
              value={this.state.note}
              onChange={this.toggleChangeNote}
            >
              <option value={5}>Fantastic</option>
              <option value={4}>Good</option>
              <option value={3}>Nothing special</option>
              <option value={2}>Not good</option>
              <option value={1}>Terrible</option>
            </Input>
          </FormGroup>
        </td>
        <td>
          <Button
            color="info"
            onClick={() => this.noteWebinar(this.props.location.webinarCode)}
          >
            Note
          </Button>
        </td>
        <div>{this.state.isModalOpen ? this.contentx : null}</div>
      </tr>
    );
  }
}

export default withRouter(NoteSelect);
