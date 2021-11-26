import { useState, useContext } from "react";
import ThemeContext from "../../../../Context/ContextStates";
import Button from "react-bootstrap/Button";
import InformationModal from "../../../../Modals/ClearOrSaveAsImgModal/InformationModal";
import ClearCanvasModal from "../../../../Modals/ClearOrSaveAsImgModal/ClearCanvasModal";

/*
 *
 * Description:
 * this component allow the user to clear the screen or send and download an image of the DFA
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const ClearOrSend = ({
  nowRunning,
  fetchingUpdateDfa,
  displayMessage,
  displaySuccessMsg,
  displayFailMessage,
  stageRef,
  currentDfa,
  setCurrentDfa,
}) => {
  const { nodes } = useContext(ThemeContext);
  //
  const [showWipeModal, setShowWipeModal] = useState(false);
  const handleCloseWipeData = () => setShowWipeModal(false);
  //
  const [showInformationModal, setShowInformationModal] = useState(false);
  const handleCloseInformation = () => setShowInformationModal(false);

  /** Checks if  the canvas is empty
   * @returns void
   */
  const validateOpening = () => {
    if (nodes.length > 0) {
      setShowWipeModal(true);
    } else {
      displayMessage(
        "light",
        "No data detected",
        "You haven't drawn anything!"
      );
    }
  };

  return (
    <>
      <div className="canvasActions">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button
            className="me-md-1"
            variant="warning"
            disabled={nowRunning || fetchingUpdateDfa}
            onClick={validateOpening}
          >
            Clear canvas
          </Button>
          <Button
            className="me-5"
            variant="secondary"
            disabled={fetchingUpdateDfa}
            onClick={() =>
              nodes.length === 0
                ? displayMessage(
                    "light",
                    "No data detected",
                    "You haven't drawn anything!"
                  )
                : setShowInformationModal(true)
            }
          >
            Save/Send as PNG
          </Button>
        </div>
      </div>
      {showInformationModal && (
        <InformationModal
          show={showInformationModal}
          handleClose={handleCloseInformation}
          stageRef={stageRef}
          displaySuccessMsg={displaySuccessMsg}
          displayFailMessage={displayFailMessage}
        />
      )}
      <ClearCanvasModal
        show={showWipeModal}
        handleClose={handleCloseWipeData}
        currentDFA={currentDfa}
        setCurrentDfa={setCurrentDfa}
      />
    </>
  );
};

export default ClearOrSend;
