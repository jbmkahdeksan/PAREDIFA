import { useState, useContext } from "react";
import axios from "axios";
import { querySaveImage } from "../../../../Util/graphQLQueryUtil";
import ThemeContext from "../../../Context/ContextStates";
import Button from 'react-bootstrap/Button'
import InformationModal from "../../../Modals/InformationModal";
import WipeDataModal from "../../../Modals/WipeDataModal";
const ClearOrSend = ({
  nowRunning,
  fetchingUpdateDfa,
  displayMessage,
  displaySuccessMsg,
  displayFailMessage,
  stageRef,
  currentDfa,
  setCurrentDfa
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
      const data = await axios.post(process.env.REACT_APP_BACK_END, {
        query: querySaveImage(link.href, firstName, lastName, id, time),
      });
      console.log(data, "email");
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
      <WipeDataModal
        show={showWipeModal}
        handleClose={handleCloseWipeData}
        currentDFA={currentDfa}
        setCurrentDfa={setCurrentDfa}
      />
    </>
  );
};

export default ClearOrSend;
