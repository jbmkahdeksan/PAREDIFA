import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
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
                       Todos
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            <ListGroup.Item  variant="dark">
                                Dark
                            </ListGroup.Item>
                            <ListGroup.Item  variant="dark">
                                Dark
                            </ListGroup.Item>
                        </ListGroup>
                    </Modal.Body>
      </Modal>
        </>
       );
}
 
export default TodosModal;