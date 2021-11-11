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
const WipeDataModal = ({ show, handleClose, currentDFA, setCurrentDfa }) => {
  const { setNodes } = useContext(ThemeContext);
  const { setEdge } = useContext(ThemeContextTr);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { setRunInfo } = useContext(ThemeContextRunInfo);

  /*
   *
   * This method wipes data application information
   *
   */
  const wipeData = () => {
    setNodes([]);
    setEdge([]);

    setGeneralInfo({
      alphabet: [],
      useDefault: false,
      wipeData: true,
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
    if (currentDFA.id) {
      setCurrentDfa({ id: null });
    }
    handleClose();
  };

  useEffect(() => {
    if (generalInfo.wipeData) {
      setGeneralInfo((e) => ({ ...generalInfo, wipeData: false }));
    }
  }, [generalInfo.wipeData]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
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
          <Button variant="secondary" onClick={handleClose}>
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
