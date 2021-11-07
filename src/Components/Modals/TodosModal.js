import Modal from "react-bootstrap/Modal";
import { BsEye, BsDownload, BsTrash } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import ThemeContext from "../Context/ContextStates";
import Spinner from "react-bootstrap/Spinner";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextTr from "../Context/ContextTransitions";
import Display from "../Display/Display";
import DeleteAutomataModal from "./DeleteAutomataModal";
import { FcMultipleInputs } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//Handle todos, tasks todo in Todo

const TodosModal = ({ title, handleShow, FaM, show }) => {
  const [dbData, setDbDAta] = useState([]);
  const [singleAutomataInfo, setSingleAutomataInfo] = useState({});
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);
  const [fetching, setFetching] = useState(false);
  const [fetchingDelete, setFetchingDelete] = useState(false);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
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
  const queryAll = `{
    allAutomatas{
      id
      name
      alphabet
      states{
        id
        name
        coord{
          x
          y
        }
        end
        start
      }
      transitions{
        id
        state_src_id{
          id
          x
          y
        }
        state_dst_id{
          id
          x
          y
        }
        symbols
        coordTemp{
          x
          y
        }
      }
      
    }
  }`;

  const displayErrorMsg = useCallback(
    (e) => {
      setMsgShow((x) => true);
      setMsgInfo((f) => ({
        bg: "warning",
        header: "Error while fetching data",
        body: `Oops! Looks like we got an error while fetching data: ${e.message}`,
      }));
    },
    [setMsgShow, setMsgInfo]
  );
  const fetchData = async () => {
    try {
      setFetching((e) => true);
      const res = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryAll,
      });

      console.log(res, "resGraphql");
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

    console.log(automata.states, "automataStates");

    setNodes(mapStates(automata));

    setEdge(mapEdges(automata));
    if (showDeleteDfaModal) setShowDeleteDfaModal(false);
    handleShow();
    console.log(automata, "automata");
  };

  const handleAutomataDelete = async () => {
    setShowDeleteDfaModal(false);
    const queryMutationDelete = `
    mutation{
      deleteAutomata(id:"${selectedDFA}")
      
    }
    `;

    try {
      setFetchingDelete(true);
      await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutationDelete,
      });
      setMsgShow((x) => true);
      setMsgInfo((f) => ({
        bg: "success",
        header: "Success!",
        body: `The DFA was successfully deleted!`,
      }));
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
    const querySingleAutomata = `
    {
      singleAutomata(id:"${idDfa}"){
        id
        name
        alphabet
        states{
          id
          name
          coord{
            x
            y
          }
          end
          start
        }
        transitions{
          id
          state_src_id{
            id
            x
            y
          }
          state_dst_id{
            id
            x
            y
          }
          symbols
          coordTemp{
            x
            y
          }
          
        }
      }
    }`;

    try {
      setFetching(true);
      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: querySingleAutomata,
      });
      if (!data.data.data.singleAutomata) {
        throw new Error("Couldnt find an automata with the given ID");
      }
      setDbDAta([data.data.data.singleAutomata]);
      console.log("single automata", data.data.data.singleAutomata);
    } catch (e) {
      handleShow();
      displayErrorMsg(e);
    } finally {
      setFetching(false);
      setIdDfa("");
    }
  };

  useEffect(() => {
    console.log(dbData, "db data");
  }, [dbData]);
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
          {fetching && (
            <div className="dfaData">
              <h1>Retrieving data...</h1>
              <div>
                <Spinner animation="border" variant="primary" />
              </div>
            </div>
          )}
          {fetchingDelete && (
            <div className="dfaData">
              <h1>Deleting automata...</h1>
              <div>
                <Spinner animation="border" variant="primary" />
              </div>
            </div>
          )}
          {!fetching && !fetchingDelete && (
            <div className="dfaDisplayContainer">
              {dbData.length > 0 && (
                <ListGroup as="ol" numbered>
                  {dbData.map((data, index) => (
                    <ListGroup.Item
                      key={index}
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{data.id}</div>
                        {data.name}
                      </div>
                      <BsTrash
                        size={23}
                        title="Click here to delete this DFA"
                        className="deleteFASpecific"
                        onClick={() => {
                          setOptionTodo(1);
                          setShowDeleteDfaModal(true);
                          setSelectedDFA(data.id);
                        }}
                      />{" "}
                      <BsDownload
                        title="Click here to download this DFA"
                        onClick={() => {
                          setSelectedDFA(data.id);
                          checkForDisplayData(data.id);
                        }}
                        className="downloadFaSpecific"
                        size={23}
                      />
                      {"   "}
                      <BsEye
                        title="Click here to preview this DFA"
                        className="displayFa"
                        onClick={() => handleDisplayData(data.id)}
                        size={23}
                      />{" "}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={
              dbData.length === 0 ? handleSingleDfaDownload : clearDbData
            }
            disabled={fetching}
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

export default TodosModal;
