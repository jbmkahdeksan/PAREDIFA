import Modal from "react-bootstrap/Modal";
import { BsInfoCircle, BsEye, BsDownload } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import ThemeContext from "../Context/ContextStates";
import Spinner from "react-bootstrap/Spinner";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextTr from "../Context/ContextTransitions";
import Display from "../Display/Display";
//Handle todos, tasks todo in Todo

const TodosModal = ({ title, handleShow, FaM, show, handleDoubleClick }) => {
  const [dbData, setDbDAta] = useState([]);
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);
  const [fetching, setFetching] = useState(false);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);

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
  const query = `{
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

  const fetchData = useCallback(
    async (cancelTokenSource) => {
      try {
        setFetching((e) => true);
        const res = await axios.post(process.env.REACT_APP_BACK_END, {
          query: query,
          cancelToken: cancelTokenSource.token,
        });

        console.log(res, "resGraphql");
        setDbDAta((e) => res.data.data.allAutomatas);
      } catch (e) {
        setMsgShow((e) => true);
        setMsgInfo((f) => ({
          bg: "warning",
          header: "Error while fetching data",
          body: `Oops! Looks like we got an error while fetching data: ${e.message}`,
        }));
        handleShow();
      } finally {
        setFetching((e) => false);
      }
    },
    [handleShow, setMsgShow, setMsgInfo, query]
  );
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    fetchData(source);
    return () => source.cancel();
  }, [fetchData]);

  const handleAutomataDownload = (automataId) => {
    const automata = dbData.find((automata) => automata.id === automataId);
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
    handleShow();
    console.log(automata, "automata");
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
            {FaM && (
              <BsInfoCircle
                className="infoDowloadFa"
                title="Names on DFA stored in the database are displayed here, DOUBLE click to download "
              />
            )}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fetching && (
            <div className="dfaData">
              <h1>Retrieving data...</h1>
              <div>
                <Spinner animation="border" variant="primary" />
              </div>
            </div>
          )}
          {!fetching && (
            <ListGroup as="ol" numbered>
              {dbData.map((data, index) => (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    {data.name}
                  </div>
                  <BsDownload
                    title="Click here to download this DFA"
                    onClick={() => handleAutomataDownload(data.id)}
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
        </Modal.Body>
      </Modal>
      <Display
        show={displayDFA}
        handleClose={handleCloseDisplayDfa}
        nodes={nodesDisplay}
        edges={edgesDisplay}
      />
    </>
  );
};

export default TodosModal;
