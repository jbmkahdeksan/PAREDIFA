import Modal from "react-bootstrap/Modal";
import { useState, useContext} from "react";
import axios from "axios";
import ThemeContext from "../../Context/ContextStates";
import ThemeContextMsgInfo from "../../Context/ContextMsg";
import ThemeContextMsg from "../../Context/ContextMessage";
import ThemeContextGeneral from "../../Context/GeneralInfo";
import ThemeContextTr from "../../Context/ContextTransitions";
import Display from "../../Display/Display";
import DeleteAutomataModal from "../DeleteDFAModal/DeleteAutomataModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SpinnerCont from "../../Spinner/SpinnerCont";
import DfaList from "../DBDataModals/DfaList";
import DeleteByRegex from "../../MainContainers/CanvasAndButtons/Buttons/DBActions/DeleteByRegex";
import DfaDownload from "../../MainContainers/CanvasAndButtons/Buttons/DBActions/DfaDownload";
import ListAllDfa from "../../MainContainers/CanvasAndButtons/Buttons/DBActions/ListAllDfa";
import { queryMutationDelete } from "../../../Util/graphQLQueryUtil";

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
  const [filterByRe, setFilterByRe] = useState(false);
  const [dfaInfoSearch, setDfaInfoSearch] = useState("");
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

  /**  Method to display a toast with a very important message to the user
   * @param bg the color of the toast
   * @param header the header of the Toast
   * @param body the body of the toast
   * @returns void
   */
  const diplayMsg = (bg, header, body) => {
    setMsgShow(true);
    setMsgInfo({
      bg: bg,
      header: header,
      body: body,
    });
  };
  /**  Method to display a toast with an error message to the user
   * @param e the error
   * @returns void
   */
  const displayErrorMsg = (e) =>
    diplayMsg(
      "warning",
      "Error while fetching data",
      `Oops! Looks like we got an error while fetching data: ${e.message}`
    );

  /**  Method to display a toast with a success message to the user
   * @param msg the msg
   * @returns void
   */
  const displaySuccessMsg = (msg) => diplayMsg("success", "Success!", msg);

  /**  Method to display download the automata with the given id
   * @param automataId The id of the automata
   * @returns void
   */
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
    if (automata.regex.length !== 0)
      sessionStorage.setItem("regex", automata.regex);
    if (automata.regex.length === 0 && sessionStorage.getItem("regex"))
      sessionStorage.clear();
    setCurrentDfa({ id: automata.id }); //***************** *******************************/
    setNodes(mapStates(automata));

    setEdge(mapEdges(automata));
    if (showDeleteDfaModal) setShowDeleteDfaModal(false);
    handleShow();
  };

  /**  Method to wipe application data
   * @returns void
   */
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

  /**  Method to delete a DFA from the DB
   * @returns void
   */
  const handleAutomataDelete = async () => {
    setShowDeleteDfaModal(false);
    try {
      setFetchingDelete(true);
      await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutationDelete(selectedDFA),
      });
      if (currentDfaId && currentDfaId === selectedDFA) {
        if (sessionStorage.getItem("regex")) sessionStorage.clear();
        wipeApplicationData();
      }
      displaySuccessMsg(`The DFA was successfully deleted!`);
    } catch (e) {
      displayErrorMsg(e);
    } finally {
      setFetchingDelete(false);
      handleShow();
    }
  };

  /**  Method to delete the temporary data of the  DB that is being displayed tot he user
   * @returns void
   */
  const clearDbData = () => {
    setDbDAta([]);
    setSelectedDFA("");
    setOptionTodo(0);
    setFilterByRe(false);
  };

  /**  Method to map states so we can show them when the user is peeking
   * @param automata the DFA selected to peek
   * @returns an array of states
   */
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

  /**  Method to map edges so we can show them when the user is peeking
   * @param automata the DFA selected to peek
   * @returns an array of edges
   */
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

  /**  Method to show the modal for peeking to the selected DFA
   * @param automataId the id of the  DFA selected to peek
   * @returns void
   */
  const handleDisplayData = (automataId) => {
    const automata = dbData.find((automata) => automata.id === automataId);
    setDisplayDfa(true);
    setNodesDisplay(mapStates(automata));
    setEdgesDisplay(mapEdges(automata));
  };

  /**  Method to pick wether the user wants to download an DFA or delete
   * @param automataId the id of the  DFA selected
   * @returns void
   */
  const checkForDisplayData = (automataId) => {
    if (nodes.length > 0) {
      setOptionTodo(2);
      setShowDeleteDfaModal(true);
      return;
    }
    handleAutomataDownload(automataId);
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
            <ListAllDfa
              setFetching={setFetching}
              setDbDAta={setDbDAta}
              displayErrorMsg={displayErrorMsg}
              handleShow={handleShow}
              setFilterByRe={setFilterByRe}
              dbData={dbData}
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
                placeholder="ID/RE of DFA to retrieve/delete"
              />
            </div>
          )}
          {dbData.length > 1  && !fetching && !fetchingDelete && (
            <div className="mb-3">
              <Form.Control
                type="text"
                value={dfaInfoSearch}
                onChange={(e) => setDfaInfoSearch(e.target.value)}
                placeholder={filterByRe ? "Search by RE" : "Search by id"}
              />
            </div>
          )}
          {fetching && <SpinnerCont text="Retrieving data..." />}
          {fetchingDelete && <SpinnerCont text="Deleting automata..." />}
          {!fetching && !fetchingDelete && (
            <DfaList
              dbData={
                !filterByRe && dfaInfoSearch.length > 0
                  ? dbData.filter((data) => data.id.includes(dfaInfoSearch))
                  : filterByRe && dfaInfoSearch.length > 0
                  ? dbData.filter((data) => data.regex.includes(dfaInfoSearch))
                  : filterByRe
                  ? dbData.filter((data) => data.regex.length > 0)
                  : dbData
              }
              setOptionTodo={setOptionTodo}
              setShowDeleteDfaModal={setShowDeleteDfaModal}
              setSelectedDFA={setSelectedDFA}
              checkForDisplayData={checkForDisplayData}
              handleDisplayData={handleDisplayData}
              currentDfaId={currentDfaId}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <DeleteByRegex
            length={dbData.length}
            fetching={fetching}
            fetchingDelete={fetchingDelete}
            displayErrorMsg={displayErrorMsg}
            idDfa={idDfa}
            handleShow={handleShow}
            displaySuccessMsg={displaySuccessMsg}
            wipeApplicationData={wipeApplicationData}
          />

          {dbData.length === 0 && (
            <DfaDownload
              idDfa={idDfa}
              setIdDfa={setIdDfa}
              setDbDAta={setDbDAta}
              handleShow={handleShow}
              displayErrorMsg={displayErrorMsg}
              setFetching={setFetching}
              fetchingDelete={fetchingDelete}
              fetching={fetching}
            />
          )}
          {dbData.length !== 0 && (
            <Button onClick={clearDbData} disabled={fetching || fetchingDelete}>
              Clear
            </Button>
          )}
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
