import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

/*
 *
 * Description:
 * Student infomation modal
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const InformationModal = ({ show, handleClose, cb, fetching, progress }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [time, setTime] = useState("");

  /**  This method downloads an image to the user
   * @returns void
   */
  const handleImageDownload = () => {
    cb(firstName, lastName, id, time);
    setFirstName("");
    setLastName("");
    setId("");
    setTime("");
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
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
              variant="secondary"
              disabled={fetching}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              disabled={fetching}
              onClick={handleImageDownload}
            >
              Download
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default InformationModal;