import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SpinnerCont from "../../Spinner/SpinnerCont";
/*
 *
 * Description:
 * Confirmation modal to delete an automata
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const DeleteAutomataModal = ({
  show,
  handleClose,
  cbDelete,
  title,
  fetchingDelete = false,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {fetchingDelete ? "Please wait..." : "WARNING"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fetchingDelete && <SpinnerCont text="Deleteing DFA.." />}
          {!fetchingDelete && title}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={fetchingDelete}
            onClick={handleClose}
          >
            NO
          </Button>
          <Button
            onClick={cbDelete}
            disabled={fetchingDelete}
            variant="primary"
          >
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAutomataModal;
