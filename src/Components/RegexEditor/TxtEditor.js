import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
/*
 *
 * Description:
 * The text editor with its options for the RE compiler
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const TxtEditor = ({
  manualName,
  setManualName,
  automatico,
  setAutomatico,
  setCheckSintax,
  checkSintax,
  setSimplifyRe,
  simplifyRe,
  dfaName,
  setDfaName,
  re,
  setRe,
}) => {
  return (
    <>
      <Form.Group as={Row} className="mb-5">
        <Form.Label as="legend" column sm={2}>
          Asign name to DFA
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            required
            type="radio"
            label="Automatico"
            onChange={() => {
              if (manualName) setManualName(false);
              setAutomatico(true);
            }}
            name="formHorizontalRadios"
            id="formHorizontalRadios4"
          />
          <Form.Check
            required
            type="radio"
            label="Manual"
            onChange={() => {
              if (automatico) setAutomatico(false);
              setManualName(true);
            }}
            name="formHorizontalRadios"
            id="formHorizontalRadios5"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-5">
        <Form.Label as="legend" column sm={2}>
          Check sintax
        </Form.Label>
        <Col className="mt-2">
          <Form.Check
            required
            type="checkbox"
            onChange={() => setCheckSintax(checkSintax)}
            name="formHorizontalRadios"
            id="formHorizontalRadios4"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-5">
        <Form.Label as="legend" column sm={2}>
          Simplify RE before compiling
        </Form.Label>
        <Col className="mt-2">
          <Form.Check
            type="checkbox"
            onChange={() => setSimplifyRe(!simplifyRe)}
            name="formHorizontalRadios"
            id="formHorizontalRadios4"
          />
        </Col>
      </Form.Group>
      {manualName && (
        <Form.Group as={Col} className="mb-3">
          <Form.Control
            type="text"
            value={dfaName}
            onChange={(e) => setDfaName(e.target.value)}
            id="alphabetInput"
            placeholder="DFA name"
          />
        </Form.Group>
      )}
      <Form.Group as={Col} className="mb-3">
        <Form.Control
          type="text"
          id="alphabetInput"
          value={re}
          onChange={(e) => setRe(e.target.value)}
          placeholder="RE"
        />
      </Form.Group>
    </>
  );
};

export default TxtEditor;
