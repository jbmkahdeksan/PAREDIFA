import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import Button from "react-bootstrap/Button";
const InformationModal = ({ show, handleClose, cb }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId]= useState('');
  const [time, setTime]= useState('')
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Student information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
            <InputGroup.Text>Id and schedule</InputGroup.Text>
            <FormControl value={id} onChange={(e) => setId(e.target.value)} aria-label="First name" />
            <FormControl value={time} onChange={(e) => setTime(e.target.value)} aria-label="Last name" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>First and last name</InputGroup.Text>
            <FormControl value={firstName} onChange={(e) => setFirstName(e.target.value)} aria-label="First name" />
            <FormControl value={lastName} onChange={(e) => setLastName(e.target.value)} aria-label="Last name" />
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> cb(firstName, lastName, id, time)}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InformationModal;
