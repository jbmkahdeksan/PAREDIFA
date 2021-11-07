import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const DeleteAutomataModal = ({show, handleClose, cbDelete, title}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {title}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button onClick={cbDelete} variant="primary">YES</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAutomataModal;
