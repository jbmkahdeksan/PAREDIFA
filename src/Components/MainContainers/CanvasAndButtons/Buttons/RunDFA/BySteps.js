import Button from "react-bootstrap/Button";
/*
 *
 * Description:
 * This component allows the user to travel to the past or future in the evaluation of the DFA
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
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
    <div className="btn-group-sm m-auto text-center mb-4" id="stepsDiv">
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
