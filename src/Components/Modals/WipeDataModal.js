import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextRunInfo from "../Context/ContextRunInfo";
import { useContext, useEffect } from "react";

/*
 *
 * Description:
 * Wipe data modal
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const WipeDataModal = (props) => {
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { runInfo, setRunInfo } = useContext(ThemeContextRunInfo);

  /*
 *
 * This method wipes data application information
 *
 */
  const wipeData = () => {
    setNodes([]);
    setEdge([]);
   
    const obj = {
      alphabet: [],
      useDefault: false,
      wipeData: true,
      showAlphabetDefault: false,
      result: false,
    };
    setGeneralInfo(obj);

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

  useEffect(() => {
    if (generalInfo.wipeData) {
      setGeneralInfo((e) => ({...generalInfo, wipeData:true}))


    }
 
  }, [generalInfo.wipeData]);
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
