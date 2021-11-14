import Modal from "react-bootstrap/Modal";
/*
 *
 * Description:
 * Guide modal
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const Instructions = (props) => {
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
          <b>CREATE STATE (Q key):</b> Create a state on the mouse position.
          <br></br>
          <b>SELECT TRANSITION / STATE:</b> Left-click on a state or transition.
          <br></br>
          <b>MOVE STATE:</b> Hold left-click on a state and move the cursor.
          <br></br>
          <b>CREATE TRANSITION (Double right click):</b> DOUBLE CLICK on the
          desired state, this will be where the transition{" "}
          <strong>BEGINS</strong>, CLICK another state where you want the
          transition to <strong>END.</strong>
          <br></br>
          <b>REMOVE TRANSITION / STATE (DEL key):</b> Once a state or transition
          is selected, press <b>DEL</b> to remove it.<br></br>
          <b>RENAME STATE (R key):</b> Once a state is selected, press <b>R</b>{" "}
          to enter the renaming mode. In the renaming mode, press <b>ENTER</b>{" "}
          to set the state name.<br></br>
          <b>SET FINAL STATE (F key):</b> Once a state is selected, press{" "}
          <b>F</b> to set it as a final state.<br></br>
          <b>SET INITIAL STATE (S key):</b> Once a state is selected, press{" "}
          <b>S</b> to set it as the start state.<br></br>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Instructions;
