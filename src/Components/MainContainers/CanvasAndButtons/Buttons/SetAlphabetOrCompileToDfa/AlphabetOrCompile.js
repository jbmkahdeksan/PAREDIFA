import AlphabetButton from "../Alphabet/AlphabetButton";
import CompileToDfa from "../CompileToDFA/CompileToDfa";
/*
 *
 * Description:
 * Component that hold the alphabet button and the compile to DFA button
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */
const AlphabetOrCompile = ({
  fetchingUpdateDfa,
  nowRunning,
  canCompileToDfa,
  addingTr,
}) => {
  return (
    <div className="d-grid col-3 mx-0 text-center border-start border-2">
      <div className="btn-group-sm m-auto text-center">
        <AlphabetButton
          nowRunning={nowRunning}
          fetchingUpdateDfa={fetchingUpdateDfa}
        />
        <CompileToDfa
          addingTr={addingTr}
          fetchingUpdateDfa={fetchingUpdateDfa}
          canCompileToDfa={canCompileToDfa}
        />
      </div>
    </div>
  );
};

export default AlphabetOrCompile;
