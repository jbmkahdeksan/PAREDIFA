import TxtEditor from "../RegexEditor/TxtEditor";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import ThemeContext from "../Context/ContextStates";
import DeleteAutomataModal from "./DeleteAutomataModal";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextTr from "../Context/ContextTransitions";
/*
 *
 * Description:
 * Regex editor modal
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const RegexEditorModal = ({ show, handleClose }) => {
  const [manualName, setManualName] = useState(false);
  const [automatico, setAutomatico] = useState(false);
  const [re, setRe] = useState("");
  const [dfaName, setDfaName] = useState("");
  const [simplifyRe, setSimplifyRe] = useState(false);
  const [checkSintax, setCheckSintax] = useState(false);
  const { nodes, setNodes } = useContext(ThemeContext);
  const { setEdge } = useContext(ThemeContextTr);
  const { setGeneralInfo } = useContext(ThemeContextGeneral);
  //delete modal if theres data
  const [showDeleteAutomata, setShowDeleteAutomata] = useState(false);
  const handleShowDeleteAutomata = () => setShowDeleteAutomata(false);

  /**  This method send the RE to be compiled by the prolog server
   * @returns void
   */
  const sendReToCompile = async () => {
    if (re.length !== 0) {
      if (nodes.length > 0) {
        setShowDeleteAutomata(true);
      }
    }
  };

  /**  This method wipes current DFA in canvas
   * @returns void
   */
  const wipeDataAutomata = () => {
    setNodes([]);
    setEdge([]);
    setGeneralInfo({
      alphabet: [],
      useDefault: false,
      wipeData: true,
      showAlphabetDefault: false,
      result: false,
    });
    handleShowDeleteAutomata();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            RegEx Mode
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="txtContainer">
          <TxtEditor
            manualName={manualName}
            setManualName={setManualName}
            automatico={automatico}
            setAutomatico={setAutomatico}
            setCheckSintax={setCheckSintax}
            checkSintax={checkSintax}
            setSimplifyRe={setSimplifyRe}
            simplifyRe={simplifyRe}
            dfaName={dfaName}
            setDfaName={setDfaName}
            re={re}
            setRe={setRe}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={sendReToCompile} variant="primary">
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteAutomataModal
        title="Are you sure you want to procede to send the RE? Your progess will be lost! "
        show={showDeleteAutomata}
        handleClose={handleShowDeleteAutomata}
        cbDelete={wipeDataAutomata}
      />
    </>
  );
};

export default RegexEditorModal;
