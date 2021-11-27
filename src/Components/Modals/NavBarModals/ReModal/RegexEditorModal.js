import TxtEditor from "../../../RegexEditor/TxtEditor";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import ThemeContext from "../../../Context/ContextStates";
import DeleteAutomataModal from "../../DeleteDFAModal/DeleteAutomataModal";
import ThemeContextGeneral from "../../../Context/GeneralInfo";
import ThemeContextTr from "../../../Context/ContextTransitions";
import ThemeContextCurrentDFA from "../../../Context/ContextCurrentDFA";
import ThemeContextMsgInfo from "../../../Context/ContextMsg";
import ThemeContextMsg from "../../../Context/ContextMessage";
import ThemeContextLayingDFA from "../../../Context/ContextLayingDFA";
import ThemeContextRunInfo from "../../../Context/ContextRunInfo";
import ThemeContextStage from "../../../Context/StageInfo";
import SpinnerCont from "../../../Spinner/SpinnerCont";
import { queryCompileRe } from "../../../../Util/graphQLQueryUtil";
import { layout } from "../../../../Util/LayoutUtil";
import axios from "axios";
/*
 *
 * Description:
 * Regex editor modal
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
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
  const { setMsgShow } = useContext(ThemeContextMsg);
  const { setMsgInfo } = useContext(ThemeContextMsgInfo);
  const { stageInfo } = useContext(ThemeContextStage);
  const { currentDfa, setCurrentDfa } = useContext(ThemeContextCurrentDFA);
  const { runInfo, setRunInfo } = useContext(ThemeContextRunInfo);
  //application laying out dfa
  const { layingDFA, setLayingDFA } = useContext(ThemeContextLayingDFA);
  //delete modal if theres data
  const [showDeleteAutomata, setShowDeleteAutomata] = useState(false);
  const handleShowDeleteAutomata = () => setShowDeleteAutomata(false);
  //
  const [fetching, setFeching] = useState(false);

  /**  This method send the RE to be compiled by the prolog server
   * @returns void
   */
  const sendReToCompile = async () => {
    try {
      setFeching(true);

      const id = manualName ? dfaName : automatico ? `${Date.now()}` : "";
      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryCompileRe(id, checkSintax, simplifyRe, re),
      });

      wipeRunInfo();

      const res = data.data.data.compileRE;
      sessionStorage.setItem("regex", re);
      if (id.length > 0) sessionStorage.setItem("idDfa", id);
      updateGeneralInfo(res);
      if (currentDfa.id) setCurrentDfa({ id: null });

      setRe("");
      if (showDeleteAutomata) setShowDeleteAutomata(false);
      layout(
        res.nodes.map((nod, index) => ({
          ...nod,
          id: `${Date.now() + index}`,
          final: nod.final,
          start: nod.initial,
        })),
        res.edges.map((e, index) => ({
          id: `${Date.now() + index}`,
          source: e.source,
          target: e.target,
          symbol: e.symbol,
        })),
        stageInfo.w,
        cbMsg,
        setLayingDFA,
        setNodes,
        setEdge
      );
    } catch (e) {
      setMsgShow(true);
      setMsgInfo({
        bg: "warning",
        header: "Information",
        body: `There was an error while compiling your RE: ${e.message}`,
      });
    } finally {
      setFeching(false);
      handleClose();
    }
  };
  const cbMsg = () => {
    setLayingDFA(false);
    setMsgShow(true);
    setMsgInfo({
      bg: "light",
      header: "Information",
      body: "DFA layout is done",
    });
  };
  /**  This method alerts the user incase theres any data in the canvas
   * @returns void
   */
  const checkForData = async () => {
    if (re.length !== 0) {
      if (nodes.length > 0) {
        setShowDeleteAutomata(true);
      } else {
        sendReToCompile();
      }
    }
  };

  /**  This method updates general information
   * @param res the result of the promise
   * @returns void
   */
  const updateGeneralInfo = (res) => {
    setGeneralInfo({
      alphabet: res.alphabet,
      useDefault: false,
      wipeData: true,
      showAlphabetDefault: false,
      result: false,
    });
  };
  /**  This method wipes run information incase the user was running the DFA by steps
   * @returns void
   */
  const wipeRunInfo = () => {
    if (runInfo.nowRunning) {
      setRunInfo({
        nowRunning: false,
        transitionID: null,
        stateID: null,
        input: null,
        currentChar: null,
        finalState: "",
        prevPressed: false,
      });
    }
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
          {fetching && <SpinnerCont />}
          {!fetching && (
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
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={checkForData}
            disabled={layingDFA || fetching}
            variant="primary"
          >
            {layingDFA ? "Disabled until laying of the DFA is done" : "Send"}
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteAutomataModal
        title="Are you sure you want to procede to send the RE? Your progess will be lost! "
        show={showDeleteAutomata}
        handleClose={handleShowDeleteAutomata}
        cbDelete={sendReToCompile}
      />
    </>
  );
};

export default RegexEditorModal;
