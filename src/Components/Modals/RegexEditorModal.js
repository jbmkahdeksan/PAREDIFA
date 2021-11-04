import TxtEditor from "../RegexEditor/TxtEditor";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


/*
 *
 * Description:
 * Regex editor modals
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const RegexEditorModal = ({ show, handleClose}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            RegEx Mode
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='txtContainer'>
         <TxtEditor/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegexEditorModal;
