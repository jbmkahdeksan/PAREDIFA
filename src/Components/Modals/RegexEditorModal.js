import TxtEditor from "../RegexEditor/TxtEditor";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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
            RE editor
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
