import Button from "react-bootstrap/Button";
/*
 *
 * Description:
 * This component allows the user to travel to the past or future in the evaluation of the DFA
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const BySteps = ({
  disablePrev,
  runBySteps,
  runInfo,
  setRunInfo,
  byStepCb,
  setDisablePrev,
}) => {
  return (
    <div className="btn-group-sm m-auto text-center" id="stepsDiv">
      <Button
        variant="danger"
        id="run-prev"
        disabled={disablePrev}
        onClick={() => runBySteps("run-prev", runInfo, setRunInfo)}
      >
        ⏪ Prev step
      </Button>
      <Button
        variant="success"
        id="run-next"
        onClick={() =>
          runBySteps("run-next", runInfo, setRunInfo, byStepCb, setDisablePrev)
        }
      >
        Next step ⏩
      </Button>
    </div>
  );
};

export default BySteps;
