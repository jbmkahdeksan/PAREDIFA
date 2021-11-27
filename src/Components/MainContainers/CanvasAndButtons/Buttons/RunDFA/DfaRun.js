import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/*
 *
 * Description:
 * This component allows user to select which method he wants to evaluate the automata
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const DfaRun = ({ inputString, handleInputChanges, handleInput, ready }) => {
  return (
    <div>
      <div className="dfaRun">
        <Form.Control
          className="m-auto w-75"
          value={inputString}
          onChange={(e) => handleInputChanges(e)}
          type="text"
          id="testString"
          placeholder="Test string"
        />
      </div>
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
