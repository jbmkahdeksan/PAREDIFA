import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import {useState, useEffect} from 'react'
const FaSaveModal = (props) => {

    const [loading,setLoading] = useState(false);
    const [faName,setFaName]=useState('');

    useEffect(()=>{
        console.log(faName);
    },[faName])
    return (
        <>
      <Modal show={props.show} onHide={() => { setLoading(false); props.handleClose() }}>
            <Modal.Header closeButton>
            <Modal.Title>Save FA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name of FA</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter FA name" 
                            value={faName} 
                            onChange={ (e) => setFaName(e.target.value) } 
                            disabled={ loading ? true : false} 
                        />
                        <Form.Text className="text-muted">
                            This will be stored in our databases with the given name
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => { setLoading(false); props.handleClose() }}>
                Close
            </Button>
            {!loading &&
                <Button variant="primary" onClick={()=> setLoading(!loading)}>
                    Save 
                </Button>
            }
            {loading &&   
                <Button variant="primary" disabled>
                    <Spinner animation="border" variant="dark" size="sm" />
                     Loading...
                </Button>
            }
            </Modal.Footer>
      </Modal>
        </>
      );
}
 
export default FaSaveModal;