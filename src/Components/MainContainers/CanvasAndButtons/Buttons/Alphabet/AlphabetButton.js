import Button from "react-bootstrap/Button";
import {useState} from 'react'
import AlphabetModal from "../../../../Modals/AlphabetModals/AlphabetModal";
/*
 *
 * Description:
 * Component to displaying the modal so the user can enter the alphabet
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const AlphabetButton = ({
  nowRunning,
  fetchingUpdateDfa,
}) => {
  const [showAlphabetModal, setShowAlphabetModal] = useState(false);
  const handleCloseAlphabetModal = () => setShowAlphabetModal(false);
  return (
    <>
      <div >
        <Button
          className="m-auto mb-2"
          onClick={() => setShowAlphabetModal(true)}
          disabled={nowRunning || fetchingUpdateDfa}
          variant="outline-primary"
          size="sm"
          id="setAlphabet"
          title="(e.g.: 1, 0)"
        >
          Set Alphabet
        </Button>
      </div>
      {showAlphabetModal && (
        <AlphabetModal
          show={showAlphabetModal}
          handleClose={handleCloseAlphabetModal}
        />
      )}
    </>
  );
};

export default AlphabetButton;
