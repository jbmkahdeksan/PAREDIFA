import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
/*
 *
 * Description:
 * The text editor with its options for the RE compiler
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const TxtEditor = ({
  manualName,
  setManualName,
  automatico,
  setAutomatico,
  setSimplifyRe,
  simplifyRe,
  dfaName,
  setDfaName,
  re,
  setRe,
}) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Group as={Row} className="mb-5">
              <Form.Label as="legend" column sm={2}>
                Asign ID to DFA
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  required
                  type="radio"
                  label="Automatic"
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
                  label="Self-assign"
                  onChange={() => {
                    if (automatico) setAutomatico(false);
                    setManualName(true);
                  }}
                  name="formHorizontalRadios"
                  id="formHorizontalRadios5"
                />
              </Col>
            </Form.Group>
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          {manualName && (
            <Form.Group as={Col} className="mb-3">
              <Form.Control
                type="text"
                value={dfaName}
                onChange={(e) => setDfaName(e.target.value)}
                id="alphabetInput"
                placeholder="DFA ID"
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
        </Row>
      </Container>
    </>
  );
};

export default TxtEditor;
