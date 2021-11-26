import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { querySaveImage } from "../../../Util/graphQLQueryUtil";

/*
 *
 * Description:
 * Student infomation modal
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */

const InformationModal = ({
  show,
  handleClose,
  stageRef,
  displaySuccessMsg,
  displayFailMessage,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [time, setTime] = useState("");
  // some states for handling fetching
  const [fetching, setFeching] = useState(false);
  const [progress, setProgress] = useState(0);
  const COURSE = {
    code: "400",
    subject: "HOMEWORK",
    year: "2020",
    cycle: "||",
  };

  /** Method to download create a href encoded in base 64
   * @returns void
   */
  const createHref = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    const DESCRIPTION = `EIF${COURSE.code}_${COURSE.subject}_${COURSE.cycle}_${COURSE.year}_${firstName} ${lastName}_${id}_${time}.png`;
    link.download = DESCRIPTION;
    link.href = uri;
    return link;
  };

  /** Method to download an image of the canvas and send it to the server
   * @returns void
   */
  const sendToEmail = async () => {
    const link = createHref();

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
      handleClose();
    }
  };

  /** Method to download an image of the canvas
   * @returns void
   */
  const downloadImage = () => {
    const link = createHref();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {fetching && <>Sending image...</>}
            {!fetching && <>Student information</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fetching && (
            <ProgressBar animated now={progress} label={`${progress}%`} />
          )}
          {!fetching && (
            <>
              <InputGroup className="mb-3">
                <InputGroup.Text>Id and schedule</InputGroup.Text>
                <FormControl
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  aria-label="First name"
                />
                <FormControl
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  aria-label="Last name"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>First and last name</InputGroup.Text>
                <FormControl
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-label="First name"
                />
                <FormControl
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-label="Last name"
                />
              </InputGroup>
            </>
          )}
        </Modal.Body>
        {!fetching && (
          <Modal.Footer>
            <Button
              variant="primary"
              disabled={fetching}
              onClick={downloadImage}
            >
              Save
            </Button>
            <Button variant="success" onClick={sendToEmail} disabled={fetching}>
              Send to email
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default InformationModal;
