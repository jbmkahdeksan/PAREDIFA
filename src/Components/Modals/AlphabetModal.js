import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState,useContext } from "react";
import ThemeContextGeneral from "../Context/GeneralInfo";
const AlphabetModal = (props) => {
  const [alphabet, setAlphabet] = useState("");
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);

  const modifyAlphabet = () =>{
    //************************************* handle validation */

    setGeneralInfo({ ...generalInfo, alphabet: [...alphabet] });
    setAlphabet('')
    props.handleClose();
  }
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Set alphabet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            onChange={(e) => setAlphabet(e.target.value)}
            value={alphabet}
            placeholder="Alphabet"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button onClick={modifyAlphabet}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlphabetModal;
