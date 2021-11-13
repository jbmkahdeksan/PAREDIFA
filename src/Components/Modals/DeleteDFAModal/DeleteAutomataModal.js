import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SpinnerCont from "../../Spinner/SpinnerCont";
/*
 *
 * Description:
 * Confirmation modal to delete an automata
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
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
