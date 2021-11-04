import Canvas from "./Canvas";
import { useRef, useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InformationModal from "../Modals/InformationModal";
import WipeDataModal from "../Modals/WipeDataModal";
import AlphabetModal from "../Modals/AlphabetModal";
import DefaultAlphabetModal from "../Modals/DefaultAlphabetModal";
import Message from "../Message/Message";
import ThemeContext from "../Context/ContextStates";
import ThemeContextTr from "../Context/ContextTransitions";
import ThemeContextMsgInfo from "../Context/ContextMsg";
import ThemeContextMsg from "../Context/ContextMessage";
import ThemeContextGeneral from "../Context/GeneralInfo";
import ThemeContextRunInfo from "../Context/ContextRunInfo";
import Reactive from "../ReactLogo/Reactive";
import ThemeContextStage from "../Context/StageInfo";
import { preProcessAutomata, runBySteps } from "../Engine/Engine";
import d3 from "d3";
import axios from "axios";
import { BsCloudArrowDown } from "react-icons/bs";
import { BsCloudArrowUp } from "react-icons/bs";
import FaSaveModal from "../Modals/FaSaveModal";
import FAmodal from "../Modals/FAmodal";
const CanvasContainer = ({
  handleIncorrectSymbolChanges,
  inputString,
  setInputString,
  ready,
  cb,
}) => {
  const stageRef = useRef(null);
  // modal information handlers
  const [showInformationModal, setShowInformationModal] = useState(false);
  const handleCloseInformation = () => setShowInformationModal(false);
  //modal wipedata handlers
  const [showWipeModal, setShowWipeModal] = useState(false);
  const handleCloseWipeData = () => setShowWipeModal(false);
  //setAlphabet modals
  const [showAlphabetModal, setShowAlphabetModal] = useState(false);
  const handleCloseAlphabetModal = () => setShowAlphabetModal(false);

  //input string

  //application information

  const { nodes, setNodes } = useContext(ThemeContext);
  const { edge, setEdge } = useContext(ThemeContextTr);
  const { msgShow, setMsgShow } = useContext(ThemeContextMsg);
  const { msgInfo, setMsgInfo } = useContext(ThemeContextMsgInfo);
  const { generalInfo, setGeneralInfo } = useContext(ThemeContextGeneral);
  const [addingTr, setAddingTr] = useState({ state: false, tr: "-1" });
  const [isByStep, setIsByStep] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  //
  //default alphabet modal
  const handleCloseDefaultAlphabetModal = () =>
    setGeneralInfo({ ...generalInfo, showAlphabetDefault: false });

  const [jsonInfo, setJsonInfo] = useState("");

  // some states for handling fetching
  const [fetching, setFeching] = useState(false);
  const [progress, setProgress] = useState(0);

  //runInfo
  const { runInfo, setRunInfo } = useContext(ThemeContextRunInfo);
  //stage info
  const { stageInfo, setStageInfo } = useContext(ThemeContextStage);

  //DFA save modals
  const [showSaveModal, setShowSaveModal] = useState(false);
  const handleCloseSaveModal = () => setShowSaveModal(false);

  //Dfa download
  const [showDfaDownload, setShowDfaDownload] = useState(false);
  const handleCloseDfaDownload = () => setShowDfaDownload(false);

  const downloadURI = async (uri, firstName, lastName, id, time) => {
    const link = document.createElement("a");
    const COURSE = {
      code: "400",
      subject: "HOMEWORK",
      year: "2020",
      cycle: "||",
    };
    const DESCRIPTION = `EIF${COURSE.code}_${COURSE.subject}_${COURSE.cycle}_${COURSE.year}_${firstName} ${lastName}_${id}_${time}.png`;
    link.download = DESCRIPTION;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setFeching(true);
    setProgress(50);

    const queryTodo = `
    
      {
        sendAutomata(binaryInfo:"${link.href}",studentName:"${firstName} ${lastName}",  studentId:"${id}", studentSchedule:"${time}")
      }
      
`;

    try {
      await axios.post("http://localhost:3001/gql", { query: queryTodo });
      setProgress(100);
      setFeching(false);
      setMsgShow(true);
      setMsgInfo({
        bg: "success",
        header: "Success!",
        body: "The image was sent successfully!",
      });
    } catch (e) {
      setMsgShow(true);
      setMsgInfo({
        bg: "warning",
        header: "Warning!",
        body: `There was an error while sending the image:  ${e.message}`,
      });
    } finally {
      handleCloseInformation();
    }
  };
  const handleImage = (firstName, lastName, id, time) => {
    const uri = stageRef.current.toDataURL();

    downloadURI(uri, firstName, lastName, id, time);
  };

  const downloadApplicationInfo = () => {
    if (nodes.length > 0) setJsonInfo(JSON.stringify(edge));
  };

  const algo = () => {
    var w = stageInfo.w;
    var h = 450;

    var dataset = {
      nodes: [
        { name: 0 },
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
        { name: 8 },
        { name: 9 },
      ],
      edges: [
        { source: 0, target: 0, symbol: "Z" },
        { source: 0, target: 2, symbol: "Z" },
        { source: 0, target: 3, symbol: "Z" },
        { source: 0, target: 4 },
        { source: 1, target: 5 },
        { source: 2, target: 5 },
        { source: 2, target: 5 },
        { source: 3, target: 4 },
        { source: 5, target: 8 },
        { source: 5, target: 9 },
        { source: 6, target: 7 },
        { source: 7, target: 8 },
        { source: 8, target: 9 },
        { source: 9, target: 1 },
      ],
    };

    const algo = {
      start: false,
      selected: false,
      final: false,
      width: 40,
      height: 40,
      type: "circle",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOpacity: 0.6,
    };
    var force = d3.layout
      .force()
      .nodes(dataset.nodes)
      .links(dataset.edges)
      .size([w, 450])
      .linkDistance(50)
      .charge(-900)
      .gravity(0.2)
      .theta(0.8)
      .alpha(0.1)
      .start();

    force.on("end", () => console.log("fuck u"));

    force.on("tick", function () {
      const array = [];
      const arrayEdge = [];
      dataset.nodes.forEach((nod, index) =>
        array.push({
          id: index.toString(),
          name: `S${index}`,
          x: nod.x,
          y: nod.y,
          ...algo,
        })
      );

      dataset.edges.forEach((ed, index) =>
        arrayEdge.push({
          id: index.toString(),
          symbol: "1",
          type: "fixed",
          from: {
            id: `${array[ed.source.index].id}`,
            x: array[ed.source.index].x,
            y: array[ed.source.index].y,
          },
          to: {
            id: `${array[ed.target.index].id}`,
            x: array[ed.target.index].x,
            y: array[ed.target.index].y,
          },
        })
      );

      setNodes(array);
      setEdge(arrayEdge);
    });
  };

  const handleCopyClipboard = () => {
    if (jsonInfo.length > 0) {
      navigator.clipboard.writeText(jsonInfo);
      setMsgShow(true);
      setMsgInfo({
        bg: "light",
        header: "Copied text to clipboard",
        body: "The text in this input field was copied into clipboard for your use",
      });
    }
  };

  const validateOpening = () => {
    if (nodes.length > 0) {
      setShowWipeModal(true);
    } else {
      setMsgShow(true);
      setMsgInfo({
        bg: "light",
        header: "No data detected",
        body: "You haven't drawn anything!",
      });
    }
  };
  useEffect(() => {
    if (generalInfo.wipeData) {
      setAddingTr((e) => ({ state: false, tr: "-1" }));
      setIsByStep((e) => false);
      setDisablePrev((e) => true);
      setJsonInfo((e) => "");
    }
  }, [generalInfo.wipeData]);
  const handleInputChanges = (e) => {
    handleIncorrectSymbolChanges(e.target.value);
    setInputString(e.target.value);
  };
  const handleInput = (type) => {
    //just incase user is adding a tmp tr
    const filteredEdge = edge.filter((ed) => ed.type === "fixed");
    if (filteredEdge.length !== edge.length)
      setAddingTr({ state: false, tr: "-1" });
    setEdge(filteredEdge);
    if (type === "step") {
      setIsByStep(true);
    }
    if (type === "cont") {
      if (isByStep) setIsByStep(false);
    }
    preProcessAutomata(
      nodes,
      filteredEdge,
      inputString,
      runInfo,
      setRunInfo,
      cb,
      type
    );
  };

  const byStepCb = (runInfoObj) => {
    setIsByStep(false);
    setDisablePrev(true);
    cb(runInfoObj);
  };

  return (
    <div className="h-100 col-9">
      <div className="d-flex justify-content-center my-4">
        <div className="d-grid col-2 mx-0 text-center border-start border-2">
          <Button
            className="m-auto"
            onClick={() => setShowAlphabetModal(true)}
            disabled={runInfo.nowRunning}
            variant="outline-primary"
            size="sm"
            id="setAlphabet"
            title="(e.g.: 1, 0)"
          >
            Set Alphabet
          </Button>
        </div>

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
            <Form.Control
              className="m-auto w-75"
              value={jsonInfo}
              onChange={(e) => setJsonInfo(e.target.value)}
              type="text"
              id="jsonInput"
              placeholder="JSON"
              disabled={runInfo.nowRunning}
              onDoubleClick={handleCopyClipboard}
            />
            <div className="btn-group-sm my-2">
              <Button
                variant="primary"
                onClick={downloadApplicationInfo}
                id="jsonDownload"
                className="mx-1"
                disabled={runInfo.nowRunning}
              >
                {" "}
                Download JSON
              </Button>
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

      <div>
        <div className="d-flex text-center">
          <Canvas
            stageRef={stageRef}
            addingTr={addingTr}
            setAddingTr={setAddingTr}
          />
        </div>
        <div className="row my-2">
          <div id="bottomCanvas">
            <div className="bottomCanvasStyle">
              <div className="dataBaseActions d-grid gap-2 d-md-flex justify-content-md-start">
                <BsCloudArrowDown
                  onClick={() => setShowDfaDownload(true)}
                  title="Click here to download a DFA from the database"
                  className="downloadFa"
                  size={23}
                />
                <BsCloudArrowUp
                  onClick={() => setShowSaveModal(true)}
                  title="Click here to save this DFA to the database"
                  className="saveFa"
                  size={23}
                />
              </div>
              <div className="canvasActions">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button
                    className="me-md-1"
                    variant="warning"
                    disabled={runInfo.nowRunning}
                    onClick={validateOpening}
                  >
                    Clear canvas
                  </Button>
                  <Button
                    className="me-5"
                    variant="secondary"
                    onClick={() => setShowInformationModal(true)}
                  >
                    Save as PNG
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FAmodal show={showDfaDownload} handleClose={handleCloseDfaDownload} />
        <FaSaveModal show={showSaveModal} handleClose={handleCloseSaveModal} />
        <InformationModal
          cb={handleImage}
          show={showInformationModal}
          handleClose={handleCloseInformation}
          fetching={fetching}
          progress={progress}
        />
        <WipeDataModal show={showWipeModal} handleClose={handleCloseWipeData} />

        <AlphabetModal
          show={showAlphabetModal}
          handleClose={handleCloseAlphabetModal}
        />
        <DefaultAlphabetModal handleClose={handleCloseDefaultAlphabetModal} />
        <Message />
      </div>
    </div>
  );
};

export default CanvasContainer;
