import React from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button} from "reactstrap";


const NoteOptionModal = (props)=>{
  const submit = (e) => {
    e.preventDefault();
    props.modalSubmit();
  }
  return(
    <div>
      <Modal isOpen={props.modalOpened} toggle={props.toggle}>
          <ModalHeader toggle={this.toggle}>Specify Note Length</ModalHeader>
          <ModalBody>
            <Form onSubmit= {submit}>
              <FormGroup>
                <Label for="noteLength">Note Length</Label>
                <Input type="number" name="noteLength" id="noteLength" value={props.noteLength} onChange={(e) => props.noteLengthChange(e)}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.modalSubmit}>Ok</Button>
          </ModalFooter>
        </Modal>
    </div>
  );
}
export default NoteOptionModal;