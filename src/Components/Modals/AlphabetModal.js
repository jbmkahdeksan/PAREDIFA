import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextMsgInfo from "../Context/ContextMsg";
const AlphabetModal = (props) => {
  const [alphabet, setAlphabet] = useState("");
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);

  const modifyAlphabet = () => {
    //************************************* handle validation */
    const regex = /[A-Za-z0-9]/g;
    const filteredAlphabet = [...new Set(alphabet.match(regex))];

    if (filteredAlphabet.length === 0) {
      setMsgShow(true);
      setMsgInfo({
        bg: "info",
        header: "Alphabet not accepted",
        body: "Only letters and numbers are allowed!",
      });
      return;
    }
    setGeneralInfo({ ...generalInfo, alphabet: filteredAlphabet });
    setAlphabet("");
    props.handleClose();
  };
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
            id='alphabetInput'
            onChange={(e) => setAlphabet(e.target.value)}
            value={alphabet}
            placeholder="Alphabet"
          />
          <Form.Text className="text-muted">
            Remeber: Only letters and numbers are accepted
          </Form.Text>
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
