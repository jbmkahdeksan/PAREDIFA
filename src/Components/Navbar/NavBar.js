import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/NavBar";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import logo from "../../Images/neg_favicon.png";
import About from "./About";
import Reactive from "../ReactLogo/Reactive";
import GuideModal from "./GuideModal";
const NavBar = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [mouseIn, setMouseIn] = useState(false);
  const handleShowIns = () => setLgShow(!lgShow);
  const [lgShow, setLgShow] = useState(false);
  const handleShow = () => setShowAbout(!showAbout);
  return (
    <>
      <Navbar bg="secondary" variant="dark">
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" onMouseLeave={() => setMouseIn(false)}>
              {mouseIn && <Reactive/>}
              <Navbar.Brand
                className={mouseIn ? "mt-3" : ""}
                onMouseOver={() => setMouseIn(true)}
              >
                {!mouseIn && (
                  <>
                    <img
                      alt=""
                      src={logo}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />{" "}
                
                  </>
                )}
              PAREDIFA
               
              </Navbar.Brand>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Nav.Link
              eventKey={2}
              onClick={handleShowIns}
              id="instructions"
              title="Instructions"
            >
              Instructions
            </Nav.Link>
            <Nav.Link
              eventKey={2}
              onClick={handleShow}
              id="about"
              title="About us"
            >
              About
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <About show={showAbout} handleShow={handleShow} />
      <GuideModal handleShow={handleShowIns} lgShow={lgShow} />
    </>
  );
};

export default NavBar;
