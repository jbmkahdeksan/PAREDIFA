import Spinner from "react-bootstrap/Spinner";
/*
 *
 * Description:
 * A lovely spinner to let the user know the data is being fetched
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const SpinnerCont = ({ text }) => {
  return (
    <div className="deleteDFA">
      <h4>{text}</h4>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default SpinnerCont;
