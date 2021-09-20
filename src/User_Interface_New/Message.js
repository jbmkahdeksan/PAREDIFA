import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import { useContext, useEffect } from 'react';
import ThemeContextMsg from '../Components/ContextMessage';
import ThemeContextMsgInfo from './ContextMsg'
const Message = (props) => {

    const {msgShow, setMsgShow} = useContext(ThemeContextMsg);
    const {msgInfo, setMsgInfo} = useContext(ThemeContextMsgInfo);
  
    useEffect(()=>{console.log("asdas")},[msgShow])
  
    return (
         <>
             <Row>
            <Col xs={6}>
              <Toast 
                className="tostada"
                bg={msgInfo.bg}
                onClose={ () => setMsgShow(false) } 
                show={msgShow} 
                delay={3000} 
                autohide
              >
                <Toast.Header >
                  <strong className="me-auto">{msgInfo.header}</strong>
      
                </Toast.Header>
                <Toast.Body>{msgInfo.body}</Toast.Body>
              </Toast>
            </Col>
          <Col xs={6}>
       
         </Col>
          </Row>
        </> 
        );
}
 
export default Message;