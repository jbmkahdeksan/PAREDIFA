import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextMsgInfo from "../Context/ContextMsg";
/*
 *
 * Description:
 * Alphabet Modal
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const AlphabetModal = (props) => {
  const [alphabet, setAlphabet] = useState("");
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);

  /**  This method checks for  correct input, and sets it if it maches a RE (designed for letters and numbers)
   */
  const modifyAlphabet = () => {
    
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
            id="alphabetInput"
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
