import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/NavBar";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import logo from "../../Images/neg_favicon.png";
import About from "../Modals/About";
import GuideModal from "../Modals/GuideModal";
import RegexEditorModal from '../Modals/RegexEditorModal';
/*
 *
 * Description:
 * Navbar component
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
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
      <About show={showAbout} handleShow={handleShow} />
      <GuideModal handleShow={handleShowIns} lgShow={lgShow} />
      <RegexEditorModal show={showEditor} handleClose={handleShowEditor}/>
    </>
  );
};

export default NavBar;
