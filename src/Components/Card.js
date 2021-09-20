import Card from 'react-bootstrap/Card';
import { BsArrowRight } from "react-icons/bs";



const Estudiante = (props) => {


  
    return (  
       <>
             <Card className="text-center" style={{marginLeft:'20%', marginRight:'10%', marginBottom:'2%'}}>
                    <Card.Header>{props.name}</Card.Header>
                    <Card.Body>
                    <Card.Title><BsArrowRight></BsArrowRight>{props.especial}</Card.Title>
           
                </Card.Body>
                <Card.Footer  className="text-muted">Grupo 01-10 am</Card.Footer>
            </Card>
            
        </>
    );
}
 
export default Estudiante;