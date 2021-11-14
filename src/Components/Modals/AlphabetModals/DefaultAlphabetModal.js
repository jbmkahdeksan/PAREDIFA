import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ThemeContextGeneral from "../../Context/GeneralInfo";
import { useContext } from "react";

/*
 *
 * Description:
 * Default alphabet Modal
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const DefaultAlphabetModal = (props) => {
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);

  /**  This method sets the default alphabet
   */
  const setDefaultAlphabet = () => {
    setGeneralInfo({
      ...generalInfo,
      alphabet: ["1", "0"],
      useDefault: true,
      showAlphabetDefault: false,
    });
  };
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
