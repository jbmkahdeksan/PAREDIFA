import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useCallback, useState, useContext } from "react";
import logo from "../../Images/una.png";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";

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
  const [dataAbout, setDataAbout] = useState(null);
  const [fetching, setFetching] = useState(false);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);

  const fetchDataAbout = useCallback(async () => {
    try {
      const queryTodo = `{
        about{
          authors{
            id
            name
          }
          team{
            id
          }
          course{
            id
            crn
            name
          }
          term{
            year
            id
          }
          version{
            id
          }
        }
      }
      `;
      setFetching(true);
      const res = await axios.post(process.env.REACT_APP_BACK_END, {
        query: queryTodo,
      });

      const data = res.data.data.about;
      console.log(data, "databout");
      setDataAbout((e) => data);
    } catch (e) {
      setMsgShow((e) => true);
      setMsgInfo((f) => ({
        bg: "warning",
        header: "Error while fetching data",
        body: `Oops! Looks like we got an error while fetching data: ${e.message}`,
      }));
    } finally {
      setFetching((e) => false);
    }
    console.log("duro papio");
  }, [setMsgInfo, setMsgShow]);

  useEffect(() => {
    fetchDataAbout();
  }, [fetchDataAbout]);
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
          {fetching && (
            <div className="aboutFetching">
              <h1>Retrieving data...</h1>
              <div>
                <Spinner animation="border" variant="primary" />
              </div>
            </div>
          )}
          {!fetching && dataAbout && (
            <>
              <div>
                <strong>
                  <p>
                    {dataAbout.course.id} - {dataAbout.course.name}
                  </p>
                </strong>
                <strong>
                  <p>Profesor: {dataAbout.course.professor}</p>
                </strong>
                <p>
                  {dataAbout.term.id} Term {dataAbout.term.year}
                </p>

                <p>Team: {dataAbout.team.id}</p>
                <br></br>
                <p>Authors: </p>
              </div>
              <div className="teamInfo" id="teamInfo">
                {dataAbout.authors.map((author, index) => (
                  <div key={index}>
                    {author.name} {author.id}
                    <br></br>
                    <br></br>
                  </div>
                ))}
                <br></br>
                <img src={logo} width="150" height="150" alt="UNA LOGO" />
                <br></br>
                {dataAbout.version.id}
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default About;
