import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useState, useContext, useCallback } from "react";
import Button from "react-bootstrap/Button";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import axios from "axios";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import Form from "react-bootstrap/Form";

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
  const [addingID, setAddingID] = useState(false);
  const [dfaID, setDfaID] = useState("");
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
  const automaticSaveAutomata = async (automataId = null) => {
    console.log(addingID, automataId , automataId.length === 0,'aumata adding')
    if (addingID && automataId.length === 0) return;
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

      const queryMutation = `mutation{
            saveAutomata(id:"${
              automataId || Date.now()
            }",name:"NONE",alphabet:${JSON.stringify(
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
      if (addingID) {
        setDfaID("");
        setAddingID(false);
      }
      setLoading((e) => false);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">DFA ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="savingDFA">
            {addingID && !loading && (
              <Form.Control
                value={dfaID}
                onChange={(e) => setDfaID(e.target.value)}
                type="text"
                placeholder="DFA Id"
              />
            )}
            {!loading && !addingID && (
              <h4>Would you like to add your own id to the DFA?</h4>
            )}
            {loading && (
              <>
                <h1>Saving DFA....</h1>
                <Spinner animation="border" variant="primary" />
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!addingID && (
            <>
              <Button
                variant="secondary"
                disabled={loading}
                onClick={() => automaticSaveAutomata()}
              >
                NO
              </Button>
              <Button disabled={loading} onClick={() => setAddingID(true)}>
                YES
              </Button>
            </>
          )}
          {addingID && (
            <>
              <Button
                variant="secondary"
                disabled={loading}
                onClick={() => setAddingID(false)}
              >
                Go back
              </Button>
              <Button
                disabled={loading}
                onClick={() => automaticSaveAutomata(dfaID)}
              >
                Send
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FaSaveModal;
