import DBActionsModal from "./DBActionsModal";

/*
 *
 * Description:
 * Dfa stored in the database
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const FAmodal = (props) => {
  return (
    <>
      <DBActionsModal
        handleShow={props.handleClose}
        show={props.show}
        FaM={true}
        title="DFA stored in the DB"
        setCurrentDfa={props.setCurrentDfa}
        currentDfaId={props.currentDfaId}
      />
      
    </>
  );
};

export default FAmodal;
