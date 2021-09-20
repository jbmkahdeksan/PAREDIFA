import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import { useContext, useEffect } from 'react';
import ThemeContextMsg from '../Components/ContextMessage';
const Message = (props) => {
    const {msgShow, setMsgShow} = useContext(ThemeContextMsg);
    useEffect(()=>{console.log("asdas")},[msgShow])
    return (
         <>
             <Row>
      <Col xs={6}>
        <Toast onClose={()=>setMsgShow(false)} position={'bottom-center'} show={msgShow} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
       
      </Col>
    </Row>
        </> 
        );
}
 
export default Message;