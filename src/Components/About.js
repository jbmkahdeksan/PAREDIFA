import Offcanvas from 'react-bootstrap/Offcanvas';

import Estudiante from './Card'
import Background from '../Images/network.png';

import Message from '../User_Interface_New/Message'
const About = ({show, handleShow, ...props}) => {
  
  return (
    <>
   
      <Offcanvas show={show} placement="start" {...props} backdrop={true} onHide={handleShow}>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Team Members</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{backgroundImage:`url(${Background})`,dispaly:"inline"}}>
          <Estudiante name="Andres Alvarez Duran" especial="117520958"/>
          <Estudiante name="Joaquin Barrientos Monge" especial="117440348"/>
          <Estudiante name="Oscar Chavarria Ortiz" especial="208260347"/>
          <Estudiante name="David Zarate Marin" especial="116770797"/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
 
export default About;
