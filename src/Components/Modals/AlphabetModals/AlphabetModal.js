import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import ThemeContextGeneral from "../../Context/GeneralInfo";
import ThemeContextMsg from "../../Context/ContextMessage";
import ThemeContextMsgInfo from "../../Context/ContextMsg";
/*
 *
 * Description:
 * Alphabet Modal
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const AlphabetModal = (props) => {
  const [alphabet, setAlphabet] = useState("");
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { setMsgShow } = useContext(ThemeContextMsg);
  const { setMsgInfo } = useContext(ThemeContextMsgInfo);

  /**  This method checks for  correct input, and sets it if it maches a RE (designed for letters and numbers)
   */
  const modifyAlphabet = () => {
    const regex = /[a-z0-9]/g;
    const filteredAlphabet = [...new Set(alphabet.match(regex))];

    if (filteredAlphabet.length === 0) {
      props.handleClose()
      setMsgShow(true);
      setMsgInfo({
        bg: "info",
        header: "Alphabet not accepted",
        body: "Only lower case letters and numbers are allowed!",
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
            Remeber: Only lowercase letters and numbers are accepted
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
