import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextRunInfo from "../Context/ContextRunInfo";
import { useContext } from "react";
const WipeDataModal = (props) => {
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { runInfo, setRunInfo } = useContext(ThemeContextRunInfo);
  const wipeData = () => {
    setNodes([]);
    setEdge([]);
    setGeneralInfo({ ...generalInfo, wipeData: true });
    setGeneralInfo({
      alphabet: [],
      useDefault: false,
      wipeData: false,
      showAlphabetDefault: false,
      result: false,
    });
    setRunInfo({
      nowRunning: false,
      transitionID: null,
      stateID: null,
      input: null,
      currentChar: null,
      finalState: "",
      prevPressed: false,
    });
    props.handleClose();
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>WARNING!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to clear screen? Data will be deleted once you
          press YES.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            NO
          </Button>
          <Button variant="primary" onClick={wipeData}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WipeDataModal;
