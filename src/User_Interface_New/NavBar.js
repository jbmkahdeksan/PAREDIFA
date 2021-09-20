
import Navbar from 'react-bootstrap/NavBar'
import {useState} from 'react'
import Container from 'react-bootstrap/Container'
import logo from '../Images/network.png'
import About from '../Components/About'
import { BsPeopleFill} from "react-icons/bs";

import './ui.css'
const NavBar = () => {
    const [showAbout, setShowAbout] = useState(false);

    const handleShow=()=>setShowAbout(!showAbout);
    return ( 
        <>
        <Navbar bg="light" variant="light">
            <Container>
                 <Navbar.Brand >
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                         PAREDIFA
                 </Navbar.Brand>
                <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                   
                    <BsPeopleFill className="aboutUs" onClick={handleShow}title="About us" size={25} />
                    </Navbar.Collapse>
            </Container>
        </Navbar>   
        <About show={showAbout} handleShow={handleShow}/>
        </>
     );
}
 
export default NavBar;