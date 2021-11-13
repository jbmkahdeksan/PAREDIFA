import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";

/*
 *
 * Description:
 * This component allows user to select which method he wants to evaluate the automata
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
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
