import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
const DfaRun = ({ inputString, handleInputChanges, handleInput, ready }) => {
  return (
    <div>
      <Form.Control
        className="m-auto w-75"
        value={inputString}
        onChange={(e) => handleInputChanges(e)}
        type="text"
        id="testString"
        placeholder="Test string"
      />
      <div className="btn-group-sm my-2">
        <Button
          variant="primary"
          disabled={!ready}
          id="runByStep"
          className="mx-1"
          onClick={() => handleInput("step")}
        >
          Run by steps
        </Button>
        <Button
          disabled={!ready}
          variant="primary"
          id="runCont"
          className="mx-1"
          onClick={() => handleInput("cont")}
        >
          Run continuously
        </Button>
      </div>
    </div>
  );
};

export default DfaRun;
