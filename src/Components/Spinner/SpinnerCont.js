import Spinner from "react-bootstrap/Spinner";
/*
 *
 * Description:
 * A lovely spinner to let the user know the data is being fetched
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
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
