import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import { useContext } from "react";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import Reactive from '../ReactLogo/Reactive'
/*
 *
 * Description:
 *  A lovely toast for showing important information to the user
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const Message = () => {
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo } = useContext(ThemeContextMsgInfo);

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
              <Reactive/>
              <strong className="me-auto">{msgInfo.header}</strong>
              <small className="text-muted">just now</small>
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
