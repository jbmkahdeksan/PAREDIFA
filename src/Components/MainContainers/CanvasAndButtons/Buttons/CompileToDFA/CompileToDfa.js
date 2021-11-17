import Button from "react-bootstrap/Button";
const CompileToDfa = ({ canCompileToDfa }) => {
  return (
    <>
      {canCompileToDfa && (
        <Button variant="outline-warning">Convert to DFA</Button>
      )}
    </>
  );
};

export default CompileToDfa;
