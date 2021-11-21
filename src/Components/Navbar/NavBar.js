import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/NavBar";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import logo from "../../Images/neg_favicon.png";
import About from "../Modals/NavBarModals/AboutModal/About";
import Instructions from "../Modals/NavBarModals/GuideModal/Instructions";
import RegexEditorModal from "../Modals/NavBarModals/ReModal/RegexEditorModal";
import React from "react";
/*
 *
 * Description:
 * Navbar component
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const NavBar = () => {
  const [showAbout, setShowAbout] = useState(false);
  const handleShowIns = () => setLgShow(!lgShow);
  const [lgShow, setLgShow] = useState(false);
  const handleShow = () => setShowAbout(!showAbout);
  const [showEditor, setShowEditor] = useState(false);
  const handleShowEditor = () => setShowEditor(!showEditor);

  return (
    <>
      <Navbar bg="secondary" variant="dark">
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Navbar.Brand>
                <>
                  <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{" "}
                </>
                PAREDIFA
              </Navbar.Brand>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Nav.Link
              className="text-light"
              eventKey={2}
              onClick={handleShowEditor}
              id="regexEditor"
              title="RegEx Mode"
            >
              RegEx Mode{" "}
            </Nav.Link>
            <Nav.Link
              className="text-light"
              eventKey={2}
              onClick={handleShowIns}
              id="instructions"
              title="Instructions"
            >
              Instructions
            </Nav.Link>
            <Nav.Link
              className="text-light"
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
      {showAbout && <About show={showAbout} handleShow={handleShow} />}
      <Instructions handleShow={handleShowIns} lgShow={lgShow} />
      {showEditor && <RegexEditorModal show={showEditor} handleClose={handleShowEditor} />}
    </>
  );
};

export default NavBar;
