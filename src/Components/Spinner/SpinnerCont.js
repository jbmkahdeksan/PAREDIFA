import Spinner from "react-bootstrap/Spinner";

const SpinnerCont = ({ text }) => {
  return (
    <div className="deleteDFA">
      <h4>{text}</h4>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default SpinnerCont;
