import Canvas from "./Canvas";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const CanvasContainer = () => {
  return (
    <>
      <div className="canvasContainer">
        <div className="canvasExtra">
          <div className="alphabet">
            <div className="btn-group-sm">

            <Button
              variant="outline-info"
              id="setAlphabet"
              title="(e.g.: 1, 0)"
            >
              Set Alphabet
            </Button>
            </div>

          </div>
          <div className="inputString">
            <Form.Control
              type="text"
              id="testString"
              placeholder="Test string"
            />
            <div className="btn-group-sm">
              <Button variant="primary" className="runByStep">
                {" "}
                Run by steps
              </Button>
              <Button variant="primary" className="runCont">
                {" "}
                Run continuously
              </Button>
            </div>
          </div>
          <div className='jsonInput'>
          <Form.Control
              type="text"
              id="jsonInput"
              placeholder="JSON"
            />
            <div className="btn-group-sm json">
              <Button variant="primary" className="jsonDownload">
                {" "}
                Download JSON
              </Button>
              <Button variant="primary" className="jsonUpload">
                {" "}
                Upload JSON
              </Button>
            </div>
          </div>
        </div>
        <div className="canvas">
          <Canvas />
          <div className="buttonsCanvas">
            <Button variant="warning">Clear canvas</Button>
            <Button variant="secondary">Save as PNG</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasContainer;
