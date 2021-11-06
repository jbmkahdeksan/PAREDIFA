import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useState, useContext } from "react";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextGeneral from "../Context/GeneralInfo";
import axios from "axios";

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
const FaSaveModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [faName, setFaName] = useState("");
  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const saveAutomata = async () => {
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
            saveAutomata(id:"${Date.now()}",name:"${faName}",alphabet:${JSON.stringify(
        generalInfo.alphabet
      )},states:[${nodosMapped}],transitions:[${edgesMapped}]){
              id
            }
          }`;

      setLoading(true);

      await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryMutation,
      });
    
    } catch (e) {
      console.log(e.message, "message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save DFA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name of DFA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter DFA name"
                value={faName}
                onChange={(e) => setFaName(e.target.value)}
                disabled={loading}
              />
              <Form.Text className="text-muted">
                This will be stored in our databases with the given name
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={loading}
            onClick={props.handleClose}
          >
            Close
          </Button>
          {!loading && (
            <Button variant="primary" onClick={saveAutomata}>
              Save
            </Button>
          )}
          {loading && (
            <Button variant="primary" disabled>
              <Spinner animation="border" variant="dark" size="sm" />
              Loading...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FaSaveModal;
