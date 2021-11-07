import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import { useContext } from "react";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextMsgInfo from "../Context/ContextMsg";
/*
 *
 * Description:
 *  A lovely toast for showing information to the user
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const Message = () => {
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);

  return (
    <>
      <Row>
        <Col xs={6}>
          <Toast
            className="tostada"
            bg={msgInfo.bg}
            onClose={() => setMsgShow(false)}
            show={msgShow}
            delay={4000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">{msgInfo.header}</strong>
            </Toast.Header>
            <Toast.Body>{msgInfo.body}</Toast.Body>
          </Toast>
        </Col>
        <Col xs={6}></Col>
      </Row>
    </>
  );
};

export default Message;
