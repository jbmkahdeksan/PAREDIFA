import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useState, useContext, useEffect, useCallback } from "react";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import axios from "axios";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";

/*
 *
 * Description:
 * This handles saving a DFA in the DB
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const FaSaveModal = ({ handleClose, show }) => {
  const [loading, setLoading] = useState(false);
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);

  const displayMessage = useCallback(
    (bg, header, body) => {
      setMsgShow((e) => true);
      setMsgInfo((e) => ({
        bg: bg,
        header: header,
        body: body,
      }));
    },
    [setMsgShow, setMsgInfo]
  );
  const saveAutomata = useCallback(async () => {
    try {
      const nodosMapped = nodes.map(
        (node) => `{
        id: "${node.id}",
        name: "${node.name}",
        coord: { x: ${node.x}, y: ${node.y} },
        end: ${node.final},
        start: ${node.start},
      }`
      );
      const edgesMapped = edge.map(
        (ed) => `{
        id: "${ed.id}",
        state_src_id: {id:"${ed.from.id}",x:${ed.from.x},y:${ed.from.y}},
        state_dst_id: {id:"${ed.to.id}",x:${ed.to.x},y:${ed.to.y}},
        symbols: ${JSON.stringify(ed.symbol.split(","))},
        coordTemp:{x:${ed.from.x},y:${ed.from.y}}
      }`
      );
      console.log("wtf");
      const queryMutation = `mutation{
            saveAutomata(id:"${Date.now()}",name:"NONE",alphabet:${JSON.stringify(
        generalInfo.alphabet
      )},states:[${nodosMapped}],transitions:[${edgesMapped}]){
              id
            }
          }`;

      setLoading((e) => true);

      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutation,
      });

      navigator.clipboard.writeText(data.data.data.saveAutomata.id);
      displayMessage(
        "success",
        "Succesfull upload",
        "Automata was uploaded successfully to the server,  copied the automata ID to your clipboard"
      );
    } catch (e) {
      displayMessage(
        "warning",
        "Error",
        `Oops! Looks lke there was an issue while uploading the data to the server: ${e.message}`
      );
    } finally {
      //limpiar datos application
      setNodes((e) => []);
      setEdge((e) => []);
      setGeneralInfo((e) => ({
        alphabet: [],
        useDefault: false,
        wipeData: true,
        showAlphabetDefault: false,
        result: false,
      }));
      //
      setLoading((e) => false);
      handleClose();
    }
  }, [
    edge,
    nodes,
    setEdge,
    setNodes,
    handleClose,
    generalInfo.alphabet,
    setGeneralInfo,
    displayMessage,
  ]);

  useEffect(() => {
    saveAutomata();
  }, []);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="savingDFA">
            <h1>Saving DFA....</h1>
            <Spinner animation="border" variant="primary" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FaSaveModal;
