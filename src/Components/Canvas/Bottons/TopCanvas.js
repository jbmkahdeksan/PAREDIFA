const TopCanvas = () => {
  return (
    <div className="d-flex justify-content-center my-4">


      <div className="d-grid col-5 mx-0 text-center border-start border-2">
        {runInfo.nowRunning && !isByStep && (
          <div className="automataRun m-auto">
            <h4>Automata is running...</h4>
            <div className="spinner">
              <Reactive />
            </div>
          </div>
        )}
        {runInfo.nowRunning && isByStep && (
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
                runBySteps(
                  "run-next",
                  runInfo,
                  setRunInfo,
                  byStepCb,
                  setDisablePrev
                )
              }
            >
              Next step ⏩
            </Button>
          </div>
        )}
        {!runInfo.nowRunning && (
          <div>
            <Form.Control
              className="m-auto w-75"
              value={inputString}
              onChange={(e) => handleInputChanges(e)}
              type="text"
              id="testString"
              placeholder="Test string"
            />
            <div className="btn-group-sm my-2">
              <Button
                variant="primary"
                disabled={!ready}
                id="runByStep"
                className="mx-1"
                onClick={() => handleInput("step")}
              >
                Run by steps
              </Button>
              <Button
                disabled={!ready}
                variant="primary"
                id="runCont"
                className="mx-1"
                onClick={() => handleInput("cont")}
              >
                Run continuously
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="d-grid col-5 mx-0 text-center border-start border-2">
        <div>
          <div className="btn-group-sm my-2">
            <Button
              variant="primary"
              disabled={runInfo.nowRunning}
              className="mx-1"
              id="jsonUpload"
              onClick={algo}
            >
              {" "}
              Upload JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCanvas;
