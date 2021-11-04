import Offcanvas from "react-bootstrap/Offcanvas";

import logo from "../../Images/una.png";

/*
 *
 * Description:
* About component
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const About = ({ show, handleShow, ...props }) => {
  const data = {
    authors: [
      {
        id: "117520958",
        name: "Andres Alvarez Duran",
      },
      {
        id: "117440348",
        name: "Joaquin Barrientos Monge",
      },
      {
        id: "208260347",
        name: "Oscar Ortiz Chavarria",
      },
      {
        id: "116770797",
        name: "David Zarate Marin",
      },
    ],
    team: {
      id: "01-10am",
    },
    course: {
      id: "EIF400",
      crn: "50038",
      name: "Paradigmas de Programacion",
      professor: "Dr. Carlos Loria-Saenz",
      college: "Universidad Nacional de Costa Rica",
    },
    term: {
      year: "2021",
      id: "II",
    },
    version: {
      id: "1.0",
    },
  };
  return (
    <>
      <Offcanvas
        show={show}
        placement="start"
        {...props}
        backdrop={true}
        onHide={handleShow}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>About the team</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ dispaly: "inline" }}>
          <div>
            <strong>
              <p>
                {data.course.id} - {data.course.name}
              </p>
            </strong>
            <strong>
              <p>Profesor: {data.course.professor}</p>
            </strong>
            <p>
              {data.term.id} Term {data.term.year}
            </p>

            <p>Team: {data.team.id}</p>
            <br></br>
            <p>Authors: </p>
          </div>
          <div className="teamInfo" id="teamInfo">
            {data.authors.map((author, index) => (
              <div key={index}>
                {author.name} {author.id}
                <br></br>
                <br></br>
              </div>
            ))}
            <br></br>
            <img src={logo} width="150" height="150" alt="UNA LOGO"/>
            <br></br>
            Version 2.0
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default About;
