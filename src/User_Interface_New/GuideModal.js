import Modal from 'react-bootstrap/Modal'

const GuideModal = (props) => {
    
    return (
        <>
              <Modal
                    size="lg"
                    show={props.lgShow}
                    onHide={props.handleShow}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Instructions
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <b>CREATE STATE (Q key):</b> create a state on the mouse position.<br></br>
                        <b>SELECT TRANSITION / STATE:</b> left-click on a state or transition.<br></br>
                        <b>MOVE STATE:</b> hold left-click on a state and move the cursor.<br></br>
                        <b>CREATE TRANSITION (E key):</b> once a state is selected, press E and select another state.<br></br>
                        <b>REMOVE TRANSITION / STATE (DEL key):</b> once a state or transition is selected, press DEL to remove it.<br></br>
                        <b>RENAME STATE (R key):</b> once a state is selected, press R to enter the renaming mode. In the renaming mode, press ENTER to set the state name.<br></br>
                        <b>SET FINAL STATE (F key):</b> once a state is selected, press F to set it as a final state.<br></br>
                        <b>SET INITIAL STATE (S key):</b> once a state is selected, press S to set it as the start state.<br></br>
                    </Modal.Body>
      </Modal>
        </>
      );
}
 
export default GuideModal;