import AlphabetButton from "../Alphabet/AlphabetButton";
import CompileToDfa from "../CompileToDFA/CompileToDfa";
const AlphabetOrCompile = ({
  fetchingUpdateDfa,
  nowRunning,
  canCompileToDfa,
}) => {
  return (
    <div className="d-grid col-3 mx-0 text-center border-start border-2">
      <div className="btn-group-sm m-auto text-center">
        <AlphabetButton
          nowRunning={nowRunning}
          fetchingUpdateDfa={fetchingUpdateDfa}
        />
        <CompileToDfa canCompileToDfa={canCompileToDfa} />
      </div>
    </div>
  );
};

export default AlphabetOrCompile;
