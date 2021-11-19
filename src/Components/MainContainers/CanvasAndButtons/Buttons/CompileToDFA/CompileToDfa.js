import Button from "react-bootstrap/Button";
const CompileToDfa = ({ canCompileToDfa }) => {
  /*
 *
 * Description:
 * Component for compiling a DFA to a NFA
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
  return (
    <>
      {canCompileToDfa && (
        <Button variant="outline-warning">Convert to DFA</Button>
      )}
    </>
  );
};

export default CompileToDfa;
