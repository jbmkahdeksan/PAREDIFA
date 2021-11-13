import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ThemeContextGeneral from "../../Context/GeneralInfo";
import { useContext } from "react";

/*
 *
 * Description:
 * Default alphabet Modal
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
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
