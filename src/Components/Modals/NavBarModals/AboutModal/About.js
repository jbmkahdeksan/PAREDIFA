import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../../../Images/una.png";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "../../../UseFetch/useFetch";
import { queryAbout } from "../../../../Util/graphQLQueryUtil";
/*
 *
 * Description:
 * About component
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const About = ({ show, handleShow, ...props }) => {
  const { data, isPending, error } = useFetch(queryAbout);

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
        <Offcanvas.Body>
          {isPending && (
            <div className="aboutFetching">
              <h1>Retrieving data...</h1>
              <div>
                <Spinner animation="border" variant="primary" />
              </div>
            </div>
          )}
          {!isPending && data && (
            <>
              <div>
                <strong>
                  <p>
                    {data.about.course.id} - {data.about.course.name}
                  </p>
                </strong>
                <strong>
                  <p>Professor: {data.about.course.professor}</p>
                </strong>
                <p>
                  {data.about.term.id} Term {data.about.term.year}
                </p>

                <p>Team: {data.about.team.id}</p>
                <br></br>
                <p>Authors: </p>
              </div>
              <div className="teamInfo" id="teamInfo">
                {data.about.authors.map((author, index) => (
                  <div key={index}>
                    {author.name} {author.id}
                    <br></br>
                    <br></br>
                  </div>
                ))}
                <br></br>
                <img src={logo} width="150" height="150" alt="UNA LOGO" />
                <br></br>
                {data.about.version.id}
              </div>
            </>
          )}
          {error && (
            <h4>There was an error while fetching team information: {error}</h4>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default About;
