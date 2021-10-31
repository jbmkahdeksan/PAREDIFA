import Modal from "react-bootstrap/Modal";
import { BsInfoCircle } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
//Handle todos, tasks todo in Todo
const TodosModal = (props) => {
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={props.handleShow}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {props.title}{" "}
            {props.FaM && (
              <BsInfoCircle
                className="infoDowloadFa"
                title="Double click to download FA"
              />
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item
              onDoubleClick={props.handleDoubleClick}
              action
              variant="dark"
            >
              Dark
            </ListGroup.Item>
            <ListGroup.Item action variant="dark">
              Dark
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TodosModal;
