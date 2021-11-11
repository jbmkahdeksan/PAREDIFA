import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import axios from "axios";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import Form from "react-bootstrap/Form";
import SpinnerCont from "../Spinner/SpinnerCont";
import { queryMutationSaveSingleDfa } from "../../Util/graphQLQueryUtil";

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
  const { setMsgShow } = useContext(ThemeContextMsg);
  const { setMsgInfo } = useContext(ThemeContextMsgInfo);
  const [addingID, setAddingID] = useState(false);
  const [dfaID, setDfaID] = useState("");

  /**  This method displays a toast with important information for the user
   * @param bg the color of the Toast
   * @param header the header of the Toast
   * @param body the text of the Toast
   */
  const displayMessage = (bg, header, body) => {
    setMsgShow(true);
    setMsgInfo({
      bg: bg,
      header: header,
      body: body,
    });
  };

  /**  This method saves a DFA in the DB
   * @param automataId optional param, user can choose to be automatic or be writted by himself
   */
  const saveAutomata = async (automataId = null) => {
    if (addingID && automataId.length === 0) return;
    try {
      setLoading(true);

      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutationSaveSingleDfa(
          automataId,
          generalInfo.alphabet,
          nodes,
          edge
        ),
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
          </div>
          {loading && <SpinnerCont text="Saving DFA..." />}
        </Modal.Body>
        <Modal.Footer>
          {!addingID && (
            <>
              <Button
                variant="secondary"
                disabled={loading}
                onClick={() => saveAutomata()}
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
              <Button disabled={loading} onClick={() => saveAutomata(dfaID)}>
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
