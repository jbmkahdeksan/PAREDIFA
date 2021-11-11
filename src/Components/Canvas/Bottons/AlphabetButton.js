import Button from "react-bootstrap/Button";
import {useState} from 'react'
import AlphabetModal from "../../Modals/AlphabetModal";
const AlphabetButton = ({
  nowRunning,
  fetchingUpdateDfa,
}) => {
  const [showAlphabetModal, setShowAlphabetModal] = useState(false);
  const handleCloseAlphabetModal = () => setShowAlphabetModal(false);
  return (
    <>
      <div className="d-grid col-2 mx-0 text-center border-start border-2">
        <Button
          className="m-auto"
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
