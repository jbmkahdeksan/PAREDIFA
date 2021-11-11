import Button from "react-bootstrap/Button";

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
