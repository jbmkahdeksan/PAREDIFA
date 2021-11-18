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
import ThemeContextStage from "../../../Context/StageInfo";
import { queryCompileRe } from "../../../../Util/graphQLQueryUtil";
import axios from "axios";
import d3 from "d3";
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
      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryCompileRe(
          manualName ? dfaName : Date.now(),
          checkSintax,
          simplifyRe,
          re
        ),
      });

      const res = data.data.data.compileRE;
      console.log(res, "data");

      const edges = res.edges;
      const nodosNuevos = res.nodes;
      console.log(res.nodes,'nodos de la request')
      setGeneralInfo({
        alphabet: res.alphabet,
        useDefault: false,
        wipeData: true,
        showAlphabetDefault: false,
        result: false,
      });
      if (currentDfa.id) setCurrentDfa({ id: null });
      setFeching(false);
      setRe("");
      if (showDeleteAutomata) setShowDeleteAutomata(false);
      handleClose();
      console.log(        nodosNuevos.map((nod,index) => ({
        ...nod,
        id:`${Date.now()+index}`,
        final: nod.final,
        start: nod.initial,
      })),'nodos')
      algo(
        nodosNuevos.map((nod,index) => ({
          ...nod,
          id:`${Date.now()+index}`,
          final: nod.final,
          start: nod.initial,
        })),
        edges.map((e,index) => ({
          id:`${Date.now()+index}`,
          source: e.source,
          target: e.target,
          symbol: e.symbol,
        }))
      );
    } catch (e) {
      setMsgShow(true);
      setMsgInfo({
        bg: "warning",
        header: "Information",
        body: `There was an error while compiling your RE: ${e.message}`
      });
    }
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

  const algo = (nodos, ed) => {
    var w = stageInfo.w;
    // var h = 450;

    var dataset = {
      nodes: nodos,
      edges: ed,
    };

    const algo = {
      selected: false,

      width: 40,
      height: 40,
      type: "circle",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOpacity: 0.6,
    };
    var force = d3.layout
      .force()
      .nodes(dataset.nodes)
      .links(dataset.edges)
      .size([w, 450])
      .linkDistance(200)
      .charge(-900)
      .gravity(0.2)
      .theta(0.8)
      .alpha(0.1)
      .start();

    force.on("end", () => {
      setLayingDFA(false);
      setMsgShow(true);
      setMsgInfo({
        bg: "light",
        header: "Information",
        body: "Im done",
      });
    });

    setLayingDFA(true);
    force.on("tick", function () {
      const array = [];
      const arrayEdge = [];
      dataset.nodes.forEach((nod, index) =>
        array.push({
          id: nod.id,
          name: nod.label,
          final: nod.final,
          start: nod.start,
          x: nod.x,
          y: nod.y,
          ...algo,
        })
      );

      dataset.edges.forEach((ed, index) =>
        arrayEdge.push({
          id: ed.id,
          symbol: ed.symbol,
          type: "fixed",
          from: {
            id: `${array[ed.source.index].id}`,
            x: array[ed.source.index].x,
            y: array[ed.source.index].y,
          },
          to: {
            id: `${array[ed.target.index].id}`,
            x: array[ed.target.index].x,
            y: array[ed.target.index].y,
          },
        })
      );

      setNodes(array);
      setEdge(arrayEdge);
    });
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
          <Button onClick={checkForData} disabled={layingDFA} variant="primary">
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
