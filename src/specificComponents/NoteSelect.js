import React from "react";
import { FormGroup, Input, Button } from "reactstrap";

function NoteSelect(props) {
  return (
    <tr>
      <td>
        <FormGroup>
          <Input type="select">
          <option value={5}>Fantastic</option>
          <option value={4}>Good</option>
          <option value={3}>Nothing special</option>
          <option value={2}>Not good</option>
          <option value={1}>Terrible</option>
          </Input>
        </FormGroup>
      </td>
      <td>
        <Button color="info">Note</Button>
      </td>
    </tr>
  );
}

export default NoteSelect;
