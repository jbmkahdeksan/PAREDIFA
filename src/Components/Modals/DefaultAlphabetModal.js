import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ThemeContextGeneral from "../Context/GeneralInfo";
import { useContext } from "react";
const DefaultAlphabetModal = (props) => {
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const setDefaultAlphabet = () =>{
    setGeneralInfo({ ...generalInfo, alphabet: ["1", "0"], useDefault: true, showAlphabetDefault:false });
    console.log("welcome")
    
  }
  return (
    <>
      <Modal
        show={generalInfo.showAlphabetDefault}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Default alphabet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Alphabet has not been set yet, would you like to use the default
          alphabet (0, 1)?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={setDefaultAlphabet}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DefaultAlphabetModal;
