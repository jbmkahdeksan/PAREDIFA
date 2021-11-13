import { useState, useContext } from "react";
import axios from "axios";
import { querySaveImage } from "../../../../Util/graphQLQueryUtil";
import ThemeContext from "../../../Context/ContextStates";
import Button from "react-bootstrap/Button";
import InformationModal from "../../../Modals/ClearOrSaveAsImgModal/InformationModal";
import ClearCanvasModal from "../../../Modals/ClearOrSaveAsImgModal/ClearCanvasModal";

/*
 *
 * Description:
 * this component allow the user to clear the screen or send and download an image of the DFA
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
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
  // some states for handling fetching
  const [fetching, setFeching] = useState(false);
  const [progress, setProgress] = useState(0);

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

  /** Method to download an image of the canvas and send it to the server
   * @param uri stage reference
   * @param firstName first name of the student
   * @param lastName last name of the student
   * @param id id of the student
   * @param time time of the  student schedule-> 10am, 12 pm ....
   * @returns void
   */
  const downloadURI = async (uri, firstName, lastName, id, time) => {
    const link = document.createElement("a");
    const COURSE = {
      code: "400",
      subject: "HOMEWORK",
      year: "2020",
      cycle: "||",
    };
    const DESCRIPTION = `EIF${COURSE.code}_${COURSE.subject}_${COURSE.cycle}_${COURSE.year}_${firstName} ${lastName}_${id}_${time}.png`;
    link.download = DESCRIPTION;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setFeching(true);
    setProgress(50);

    try {
       await axios.post(process.env.REACT_APP_BACK_END, {
        query: querySaveImage(link.href, firstName, lastName, id, time),
      });
      
      setProgress(100);
      setFeching(false);
      displaySuccessMsg("The image was sent successfully!");
    } catch (e) {
      displayFailMessage(
        `There was an error while sending the image:  ${e.message}`
      );
    } finally {
      handleCloseInformation();
    }
  };

  /** Method to download an image of the canvas and send it to the server
   * @param firstName first name of the student
   * @param lastName last name of the student
   * @param id id of the student
   * @param time time of the  student schedule-> 10am, 12 pm ....
   * @returns void
   */
  const handleImage = (firstName, lastName, id, time) => {
    const uri = stageRef.current.toDataURL();

    downloadURI(uri, firstName, lastName, id, time);
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
            Save as PNG
          </Button>
        </div>
      </div>
      {showInformationModal && (
        <InformationModal
          cb={handleImage}
          show={showInformationModal}
          handleClose={handleCloseInformation}
          fetching={fetching}
          progress={progress}
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
