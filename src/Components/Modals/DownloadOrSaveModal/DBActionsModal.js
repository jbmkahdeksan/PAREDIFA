import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import axios from "axios";
import ThemeContext from "../../Context/ContextStates";
import ThemeContextMsgInfo from "../../Context/ContextMsg";
import ThemeContextMsg from "../../Context/ContextMessage";
import ThemeContextGeneral from "../../Context/GeneralInfo";
import ThemeContextTr from "../../Context/ContextTransitions";
import Display from "../../Display/Display";
import DeleteAutomataModal from "../DeleteDFAModal/DeleteAutomataModal";
import { FcMultipleInputs } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SpinnerCont from "../../Spinner/SpinnerCont";
import DfaList from "../DBDataModals/DfaList";
import {
  querySingleAutomata,
  queryMutationDelete,
  queryAllAutomatas,
} from "../../../Util/graphQLQueryUtil";
//Handle todos, tasks todo in Todo
/*
* EIF400 -- Paradigmas de Programacion
* @since II Term - 2021
* @authors Team 01-10am
*  - Andres Alvarez Duran 117520958 
*  - Joaquin Barrientos Monge 117440348
*  - Oscar Ortiz Chavarria 208260347
*  - David Zarate Marin 116770797
*/
const DBActionsModal = ({
  title,
  handleShow,
  show,
  setCurrentDfa,
  currentDfaId,
}) => {
  const [dbData, setDbDAta] = useState([]);

  const { nodes, setNodes } = useContext(ThemeContext);
  const { setEdge } = useContext(ThemeContextTr);
  const { setMsgShow } = useContext(ThemeContextMsg);
  const { setMsgInfo } = useContext(ThemeContextMsgInfo);
  const [fetching, setFetching] = useState(false);
  const [fetchingDelete, setFetchingDelete] = useState(false);
  const { setGeneralInfo } = useContext(ThemeContextGeneral);
  const [idDfa, setIdDfa] = useState("");

  //displa of dfa
  const [displayDFA, setDisplayDfa] = useState(false);
  const handleCloseDisplayDfa = () => {
    setNodesDisplay([]);
    setEdgesDisplay([]);
    setDisplayDfa(false);
  };

  //temporary states and edges por displaying
  const [nodesDisplay, setNodesDisplay] = useState([]);
  const [edgesDisplay, setEdgesDisplay] = useState([]);

  //delete automata modal info
  const [showDeleteDfaModal, setShowDeleteDfaModal] = useState(false);
  const handleCloseShowDeleteDfaModal = () => {
    setSelectedDFA("");
    setShowDeleteDfaModal(false);
    setOptionTodo(0);
  };
  //selectedAutomata for deleteing/ uploading to the display
  const [selectedDFA, setSelectedDFA] = useState("");
  const [optionTodo, setOptionTodo] = useState(0);
  const stateKonvaInformation = {
    selected: false,
    width: 40,
    height: 40,
    type: "circle",
    shadowColor: "black",
    shadowBlur: 10,
    shadowOpacity: 0.6,
    running: false,
  };

  const displayErrorMsg = (e) => {
    setMsgShow(true);
    setMsgInfo({
      bg: "warning",
      header: "Error while fetching data",
      body: `Oops! Looks like we got an error while fetching data: ${e.message}`,
    });
  };

  const fetchData = async () => {
    try {
      setFetching((e) => true);
      const res = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryAllAutomatas,
      });

      setDbDAta((e) => res.data.data.allAutomatas);
    } catch (e) {
      displayErrorMsg(e);
      handleShow();
    } finally {
      setFetching((e) => false);
    }
  };

  const handleAutomataDownload = (automataId) => {
    const automata = dbData.find(
      (automata) => automata.id === (automataId || selectedDFA)
    );
    setGeneralInfo({
      alphabet: automata.alphabet,
      useDefault: false,
      wipeData: true,
      showAlphabetDefault: false,
      result: false,
    });

    setCurrentDfa({ id: automata.id }); //***************** *******************************/
    setNodes(mapStates(automata));

    setEdge(mapEdges(automata));
    if (showDeleteDfaModal) setShowDeleteDfaModal(false);
    handleShow();
  };

  const wipeApplicationData = () => {
    setCurrentDfa({ id: null });
    setNodes([]);
    setEdge([]);
    setGeneralInfo({
      alphabet: [],
      useDefault: false,
      wipeData: true,
      showAlphabetDefault: false,
      result: false,
    });
  };
  const handleAutomataDelete = async () => {
  
    setShowDeleteDfaModal(false);
    try {
      setFetchingDelete(true);
      await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutationDelete(selectedDFA),
      });
      if (currentDfaId && currentDfaId === selectedDFA) {
        wipeApplicationData();
      }
      setMsgShow(true);
      setMsgInfo({
        bg: "success",
        header: "Success!",
        body: `The DFA was successfully deleted!`,
      });
    } catch (e) {
      displayErrorMsg(e);
    } finally {
      setFetchingDelete(false);
      handleShow();
    }
  };

  const clearDbData = () => {
    setDbDAta([]);
    setSelectedDFA("");
    setOptionTodo(0);
  };
  const mapStates = (automata) =>
    automata.states.map((state) => ({
      id: state.id,
      x: state.coord.x,
      y: state.coord.y,
      start: state.start,
      final: state.end,
      name: state.name,
      ...stateKonvaInformation,
    }));

  const mapEdges = (automata) =>
    automata.transitions.map((tr) => ({
      running: false,
      id: tr.id,
      symbol: tr.symbols.join(","),
      type: "fixed",
      coordTemp: tr.coordTemp,
      from: tr.state_src_id,
      to: tr.state_dst_id,
    }));
  const handleDisplayData = (automataId) => {
    const automata = dbData.find((automata) => automata.id === automataId);
    setDisplayDfa(true);
    setNodesDisplay(mapStates(automata));
    setEdgesDisplay(mapEdges(automata));
  };

  const checkForDisplayData = (automataId) => {
    if (nodes.length > 0) {
      setOptionTodo(2);
      setShowDeleteDfaModal(true);
      return;
    }
    handleAutomataDownload(automataId);
  };

  const handleSingleDfaDownload = async () => {
    if (idDfa.length === 0) return;

    try {
      setFetching(true);
      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: querySingleAutomata(idDfa),
      });
      if (!data.data.data.singleAutomata) {
        throw new Error("Couldnt find an automata with the given ID");
      }
      setDbDAta([data.data.data.singleAutomata]);
    } catch (e) {
      handleShow();
      displayErrorMsg(e);
    } finally {
      setFetching(false);
      setIdDfa("");
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleShow}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {title}{" "}
            <FcMultipleInputs
              size={33}
              title="Click here to list them all"
              onClick={fetchData}
              className="downloadAllDfa"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dbData.length === 0 && !fetching && !fetchingDelete && (
            <div className="mb-3">
              {" "}
              <Form.Control
                type="text"
                value={idDfa}
                onChange={(e) => setIdDfa(e.target.value)}
                placeholder="ID of DFA to retrieve"
              />
            </div>
          )}
          {fetching && <SpinnerCont text="Retrieving data..." />}
          {fetchingDelete && <SpinnerCont text="Deleting automata..." />}
          {!fetching && !fetchingDelete && (
            <DfaList
              dbData={dbData}
              setOptionTodo={setOptionTodo}
              setShowDeleteDfaModal={setShowDeleteDfaModal}
              setSelectedDFA={setSelectedDFA}
              checkForDisplayData={checkForDisplayData}
              handleDisplayData={handleDisplayData}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={
              dbData.length === 0 ? handleSingleDfaDownload : clearDbData
            }
            disabled={fetching || fetchingDelete}
          >
            {dbData.length === 0 ? "Retrieve" : "Clear"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Display
        show={displayDFA}
        handleClose={handleCloseDisplayDfa}
        nodes={nodesDisplay}
        edges={edgesDisplay}
      />
      <DeleteAutomataModal
        show={showDeleteDfaModal}
        title={
          optionTodo === 1
            ? "Are you sure you want to delete this DFA? This action cannot be undone!"
            : "Are you sure you want to download this DFA? Your data will be lost!"
        }
        handleClose={handleCloseShowDeleteDfaModal}
        cbDelete={
          optionTodo === 1
            ? handleAutomataDelete
            : () => handleAutomataDownload()
        }
      />
    </>
  );
};

export default DBActionsModal;
